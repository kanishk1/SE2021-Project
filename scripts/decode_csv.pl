#!/usr/bin/env perl

use Text::ParseWords;

while (<>) {
    my @f = parse_line(",", 0, $_);
    next if $f[2] !~ /SUBURB/;
    for (@f[11, 12]) {
        /(-)?(\d+) +(\d+) +(\d+)/;
        $_ = $2 + ($3 + ($4 / 60)) / 60;
        $_ = -$_ if $1;
    }
    print join(",", @f[1, 11, 12]) . "\n";
}
