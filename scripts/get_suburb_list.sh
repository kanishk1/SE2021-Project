#!/bin/sh

wget -q -O- "http://www.gnb.nsw.gov.au/__gnb/gnr.zip" | zcat -q - |
perl -MText::ParseWords -ne'@f=parse_line(",",0,$_);print join(",",@f[1,11,12])."\n" if ($f[2]=~/SUBURB/)' |
mongoimport -h "localhost:27017" -d "suburber" -c "suburb_names" -f "name,lat,long" --type "csv" --drop
