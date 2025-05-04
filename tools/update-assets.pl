#!/usr/bin/env perl

use v5.036;

use FindBin;
use Git::Repository ();
use Pod::Usage;
use Test::More;

=head1 NAME

update-assets.pl - Asset versioning tool for the MetaCPAN Grep Frontend

=head1 SYNOPSIS

    # Run the script to update and timestamp all assets
    ./tools/update-assets.pl

=head1 DESCRIPTION

This script implements a cache-busting strategy for web assets by:

1. Finding all CSS/JS assets referenced in HTML and view files
2. Creating new copies with timestamp-based filenames (YYYYMMDDHHMMSS-filename.js)
3. Updating all references in source files to point to the new timestamped versions
4. Removing the old asset files
5. Committing all changes to Git

The script helps ensure that users always receive the latest version of assets
when changes are deployed, preventing browsers from using cached outdated versions.

=head1 PROCESS

The script:

1. Uses Git to find all references to assets in /_assets/ directory
2. For each asset found:
   - Creates a new copy with a timestamp prefix
   - Uses sed to replace all references in source files
   - Adds new files to Git and removes old ones
3. Commits all changes with a message "Bump assets to TIMESTAMP"

=head1 REQUIREMENTS

- Git::Repository Perl module
- Command-line access to Git repository
- Unix-like environment (uses sed)

=head1 AUTHOR

MetaCPAN Team

=cut

exit( run(@ARGV) // 0 ) unless caller();

sub run(@args) {

    if ( grep { $_ eq '--help' || $_ eq '-h' } @args ) {
        return pod2usage( -verbose => 2, -exitval => 0 );
    }

    my $root = $FindBin::Bin . q{/..};

    my $git = Git::Repository->new( work_tree => $root );

    my @out = $git->run( 'grep', q{/_assets/}, map {"src/$_"} 'views',
        'public/*.html' );

    my %assets;

    foreach my $line (@out) {
        my ( $file, $line ) = split( q{:}, $line, 2 );
        if ( $line =~ qr{/_assets/([a-zA-Z0-9-]+\.(css|js))} ) {
            my $asset = $1;
            if ( !exists $assets{$asset} ) {
                $assets{$asset}
                    = -e qq{$root/src/public/_assets/$asset} ? {} : 0;
            }
            next if !$assets{$asset};
            $assets{$asset}->{$file} = 1;    # only tag the file once
        }
    }

    chdir($root) or die;

    my $ts = qx{date "+%Y%m%d%H%M%S"};
    chomp $ts;

    die unless $ts;
    my $ok;

    foreach my $asset ( sort keys %assets ) {
        next unless ref $assets{$asset};
        my ( $prefix, $base ) = split( '-', $asset, 2 );
        $base = $prefix if !defined $base;
        my $new            = qq{/_assets/$ts-$base};
        my $new_asset_file = qq{$root/src/public/$new};
        my $old_asset      = "$root/src/public/_assets/$asset";
        system( 'cp', $old_asset, $new_asset_file ) == 0
            or die;

        my $cmd = qq{sed -i -e "s|/_assets/$asset|$new|g" }
            . join( ' ', sort keys %{ $assets{$asset} } );
        qx{$cmd};
        warn "Error: $cmd - $!" if $? != 0;

        $git->run( 'add', $new_asset_file, sort keys %{ $assets{$asset} } );
        $git->run( 'rm', $old_asset );

        foreach my $f ( sort keys %{ $assets{$asset} } ) {
            my $_e = $f . q{-e};
            unlink $_e if -e $_e;
        }
        $ok = 1;
    }

    if ($ok) {
        $git->run( 'commit', '-m', "Bump assets to $ts" )
            or die "Error while committing";
        note qq{Assets updated to: $ts};
        note scalar $git->run( 'show', '--stat', '-n1' );
    }
    else {
        note q{Nothing to do};
    }

    return;
}

