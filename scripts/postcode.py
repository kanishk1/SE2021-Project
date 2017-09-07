#!/usr/bin/env python3

import urllib.request
import json
import sys
import re

# change to environment variable?
key = 'AIzaSyAu2xaFuNTQ0JQPUIXMILT1l29nuWYEO0Q'

req1 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=%s&input=%s%%20Australia&location=%s,%s&types=(regions)'
req2 = 'https://maps.googleapis.com/maps/api/place/details/json?key=%s&placeid=%s'

try:
    for line in sys.stdin:
        tokens = re.split(',', line.strip())

        tokens[0] = urllib.parse.quote_plus(tokens[0])
        response = urllib.request.urlopen(req1 % (key, *tokens))
        data = json.loads(response.read())
        if not data['predictions'] or len(data['predictions']) == 0:
            print("Couldn't get predictions for %s", tokens[0])
            continue

        place_id = data['predictions'][0]['place_id'];

        response = urllib.request.urlopen(req2 % (key, place_id))
        data = json.loads(response.read())

        postal_code = '';
        for x in data['result']['address_components']:
            if 'postal_code' in x['types']:
                postal_code = x['long_name']

        print(*tokens, postal_code, sep=',')
        sys.stdout.flush();
except urllib.error.HTTPError:
    print("Error with tokens: ", *tokens)