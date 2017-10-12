#!/bin/sh
# That perl is why I don't write scripts at three in the morning

# TODO: don't actually have a login; Jono has one?
USERNAME="John Smith"
PASSWORD="password123"

AUTH="`echo "$USERNAME:$PASSWORD" | base64 -w0`"
URL="https://opendata.transport.nsw.gov.au/api/download/ca137e89-b274-428c-988c-1f56be759260"

# curl -H "Authorization: Basic $AUTH" "$URL" |
cat LocationFacilityData.csv | # temporary
./decode_tfnsw.pl | sort -u |
perl -anF, -e 'if($F[0]eq$o[0]){$F[$_]|=$o[$_]for(2..4)}else{print join",",@o}@o=@F' |
mongoimport -h"${1:-localhost:27017}" -d"${2:-suburber}" -c"transport" \
    -f"suburb,postcode,train,bus,ferry" --type=csv --drop
