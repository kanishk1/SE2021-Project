#!/usr/bin/env perl

use v5.10;

use strict;
use warnings;

use Text::ParseWords;

<>; # ditch header
while (<>) {
    s/\R//g; # silly windows line endings

    my @f = parse_line(",", 0, $_);
    next if @f != 10;

    $f[6] =~ /, ([\w\s]+) NSW (\d{4})$/ or next;
    my $suburb = $1;
    my $post = $2;

    my ($train, $bus, $ferry, $lr) = (0, 0, 0, 0);
    my @types = $f[-1] =~ /(?:, )?([^,]+)/g;
    for my $t (@types) {
        $train = 1 if $t eq "Train";
        $ferry = 1 if $t eq "Ferry";
        $bus   = 1 if $t eq "Bus";
        $lr    = 1 if $t eq "Light rail";
    }

    say qq{"$suburb",$post,$train,$bus,$ferry,$lr};
}
