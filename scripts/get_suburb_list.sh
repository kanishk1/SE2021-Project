#!/bin/sh

wget -q -O- "http://www.gnb.nsw.gov.au/__gnb/gnr.zip" | zcat -q - |
perl -MText::ParseWords -ne'@f=parse_line(",",0,$_);next if$f[2]!~/SUBURB/;
    for$i(@f[11,12]){$i=~/(-)?(\d+) +(\d+) +(\d+)/;$i=$2+($3+$4/60)/60;$i*=-1if$1}
    print join(",",@f[1,11,12])."\n"' |
mongoimport -h "${1:-localhost:27017}" -d "${2:-suburber}" -c "suburb_names" -f "name,lat,long" --type "csv" --drop
