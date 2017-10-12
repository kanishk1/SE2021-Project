#!/usr/bin/env perl

use v5.10;

use strict;
use warnings;

use Text::ParseWords;

<>; # ditch header
while (<>) {
    my @f = parse_line(",", 0, $_);
    next if @f != 10;

    $f[6] =~ /, ([\w\s]+) NSW (\d{4})$/ or next;
    my $suburb = $1;
    my $post = $2;

    my ($train, $bus, $ferry) = (0, 0, 0);
    my @types = $f[-1] =~ /(?:, )?(\w+)/g;
    for (@types) {
        $train = 1 if $_ eq "Train";
        $ferry = 1 if $_ eq "Ferry";
        $bus   = 1 if $_ eq "Bus";
    }

    say qq{"$suburb",$post,$train,$bus,$ferry};
}
