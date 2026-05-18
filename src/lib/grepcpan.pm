package grepcpan;    # the dancer app

# smoke one more time
use Dancer2;
use Dancer2::Serializer::JSON;
use Encode;

use GrepCpan::Grep ();

use GrepCpan::std;

use URI::Escape qw(uri_escape_utf8 uri_unescape);
use utf8;

our $VERSION = '1.01';

my $Config = config()->{'grepcpan'};

# patch the LD_LIBRARY_PATH to load libpcre
if ( $Config->{'ENV'} && $Config->{'ENV'}{'LD_LIBRARY_PATH'} ) {
    $ENV{'LD_LIBRARY_PATH'} = $Config->{'ENV'}{'LD_LIBRARY_PATH'};
}

my $grep = GrepCpan::Grep->new( config => $Config );
$grep->cache();    # create and cleanup cache directory at startup

my $COOKIE_LAST_SEARCH = $Config->{'cookie'}->{'history_name'}
    or die "missing cookie:history entry";

###
### regular routes
###

get '/' => \&home;

get '/about' => sub {
    _set_cache_headers_for('aboutpage');
    return template 'about' =>
        { 'title' => 'About grep::metacpan', menu => 'about' };
};

get '/faq' => sub {
    _set_cache_headers_for('faqpage');
    return template 'faq' =>
        { 'title' => 'FAQs for grep::metacpan', menu => 'faq' };
};

get '/api' => sub {
    _set_cache_headers_for('apipage');
    return template 'api' =>
        { 'title' => 'APIs how to use grep::metacpan APIs', menu => 'api' };
};

get '/source-code' => sub {
    return template 'source-code' => {
        'title' => 'Source code of grep::metacpan, list of git reposities',
        menu    => 'gh'
    };
};

get '/search' => sub {
    my %i = ( # input
        q   => param('q'),      # search query
        qft => param('qft'),    # filetype
        qd  => param('qd'),     # distro
        qls => param('qls'),    # only list files
        qifl => param('qifl'),  # ignore files
    );

    my $qci          = param('qci');       # case insensitive
    my $page         = param('p') || 1;
    my $file         = param('f');

    my $query        = $grep->do_search(
        search          => $i{'q'},
        page            => $page - 1,
        search_distro   => $i{'qd'},  # filter on a distribution
        search_file     => $file,
        filetype        => $i{'qft'},
        caseinsensitive => $qci,
        list_files      => $i{'qls'},      # not used for now, only impact the view
        ignore_files    => $i{'qifl'},
    );

    my $nopagination = defined $file && length $file ? 1 : 0;
    my $show_sumup   = !$query->{is_a_known_distro}
        ;    #defined $distro && length $distro ? 0 : 1;

    my $template = $i{'qls'} ? 'list-files' : 'search';

    my $alerts = {};

    # check if some of the input parameters are invalid and updated
    if ( my $adjustments = $query->{adjusted_request} ) {
        foreach my $key ( keys $adjustments->%* ) {
            my $adjustment = $adjustments->{$key} // {};
            if ( $adjustment->{error} ) {
                $alerts->{danger} //= '';
                $alerts->{danger} .= $adjustment->{error};
            }
            $i{$key} = $adjustment->{value} if defined $adjustment->{value};
        }
    }

    return template $template => {
        search        => $i{'q'},
        search_distro => $i{'qd'},
        query         => $query,
        page          => $page,
        last_searches => _update_history_cookie({
            q   => $i{'q'},
            qft => $i{'qft'},
            qd  => $i{'qd'},
            qls => $i{'qls'},
            qci => $qci,
            qifl => $i{'qifl'},
        }),
        nopagination  => $nopagination,
        show_sumup    => $show_sumup,
        qft           => $i{'qft'} // '',
        qd            => $i{'qd'} // '',
        qls           => $i{'qls'},
        qci           => $qci,
        qifl          => $i{'qifl'},
        alert         => $alerts // {},
    };
};

### API routes
get '/api/search' => sub {
    my $q            = param('q');
    my $filetype     = param('qft');
    my $qdistro      = param('qd');
    my $qci          = param('qci');      # case insensitive
    my $page         = param('p') || 1;
    my $file         = param('f');
    my $ignore_files = param('qifl');

    my $query = $grep->do_search(
        search          => $q,
        page            => $page - 1,
        search_distro   => $qdistro,        # filter on a distribution
        search_file     => $file,
        filetype        => $filetype,
        caseinsensitive => $qci,
        ignore_files    => $ignore_files,
    );

    content_type 'application/json';
    return to_json $query;
};

###
### dummies helpers
###

sub _update_history_cookie ($params)
{    # and return the human version list in all cases...

    my $separator = q{||};

    my $value = Encode::decode( 'UTF-8', cookie($COOKIE_LAST_SEARCH) );

    my @last_searches = split( qr{\Q$separator\E}, $value // '' );

    my $search = ref $params eq 'HASH' ? $params->{q} : $params;

    if ( defined $search && length $search ) {

        # build a query string entry with all active filters
        my $entry;
        if ( ref $params eq 'HASH' ) {
            $entry = _build_search_entry($params);
        }
        else {
            $entry = $search;
        }

        # deduplicate by comparing the q param (core search term)
        @last_searches = grep { _extract_q($_) ne $search } @last_searches;
        unshift @last_searches, $entry;    # move it first
        @last_searches = splice( @last_searches, 0,
            $Config->{'cookie'}->{'history_size'} );
        cookie
            $COOKIE_LAST_SEARCH =>
            Encode::encode( 'UTF-8', join( $separator, @last_searches ) ),
            expires => "21 days";
    }

    # return structured data for the template
    return [ map { _parse_search_entry($_) } @last_searches ];
}

sub _build_search_entry ($params) {
    my @parts;
    for my $key (qw(q qd qft qci qls qifl)) {
        my $val = $params->{$key};
        push @parts, "$key=" . uri_escape_utf8($val)
            if defined $val && length $val;
    }
    return join( '&', @parts );
}

sub _extract_q ($entry) {
    # handle both old format (plain string) and new format (query string)
    if ( $entry =~ m{(?:^|&)q=([^&]*)} ) {
        return uri_unescape($1);
    }
    return $entry;    # legacy plain search term
}

sub _parse_search_entry ($entry) {
    # new format: q=foo&qd=Bar&qci=1
    if ( $entry =~ m{(?:^|&)q=} ) {
        my %params;
        for my $pair ( split /&/, $entry ) {
            my ( $k, $v ) = split /=/, $pair, 2;
            $params{$k} = $v if defined $k && defined $v;
        }
        return {
            query_string => $entry,
            display      => uri_unescape($params{q} // ''),
        };
    }

    # legacy format: plain search term
    return {
        query_string => "q=$entry",
        display      => $entry,
    };
}

sub home {

    _set_cache_headers_for('homepage');

    template(
        'index' => {
            'title'         => 'grepcpan',
            'cpan_index_at' => $grep->cpan_index_at()
        }
    );
}

sub _set_cache_headers_for($key) {

    # for browsers
    response_header( 'Cache-Control' => 'max-age=3600' );

    # for CDN, reverse proxies & co
    response_header(
        'Surrogate-Control' => 'max-age=3600, stale-while-revalidate=60' );
    response_header( 'Surrogate-Key' => $key );

    return;
}

true;
