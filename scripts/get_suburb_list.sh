#!/bin/sh

tmp=$(mktemp)
trap "if [ -e ${tmp} ]; then rm -f ${tmp}; fi" INT TERM HUP EXIT

wget -O${tmp} "http://www.gnb.nsw.gov.au/__gnb/gnr.zip"

unzip -qp ${tmp} | ./decode_csv.pl | ./postcode.py |
mongoimport -h "${1:-localhost:27017}" -d "${2:-suburber}" -c "suburb_names" -f "name,lat,long,post" --type "csv" --drop
