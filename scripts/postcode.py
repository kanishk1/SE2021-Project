#!/usr/bin/env python3

import urllib.parse
import urllib.request
import urllib.error
import json
import sys
import re

# change to environment variable?
key = 'AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q'

req1 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=%s&input=%s,%%20New%%20South%%20Wales,%%20Australia&location=%s,%s&types=(regions)'
req2 = 'https://maps.googleapis.com/maps/api/place/details/json?key=%s&placeid=%s'

try:
    for line in sys.stdin:
        tokens = re.split(',', line.strip())
        if len(tokens) != 3:
            print("Wrong number of tokens (%s)" % (str(tokens)), file=sys.stderr)
            continue

        values = [urllib.parse.quote_plus(t) for t in tokens];
        response = urllib.request.urlopen(req1 % (key, *values))
        data = json.loads(response.read())
        if not data['predictions'] or len(data['predictions']) == 0:
            print("Couldn't get predictions for", tokens[0], file=sys.stderr)
            continue

        place_id = data['predictions'][0]['place_id'];

        response = urllib.request.urlopen(req2 % (key, place_id))
        data = json.loads(response.read())

        postal_code = None
        if 'result' in data:
            for x in data['result']['address_components']:
                if 'postal_code' in x['types']:
                    postal_code = x['long_name']
        if not postal_code:
            print("Couldn't get postal code (%s)" % (*values,), file=sys.stderr)
            continue

        print(*tokens, postal_code, sep=',')
except urllib.error.HTTPError:
    print("Error with tokens (%s)" % (*tokens,), file=sys.stderr)
