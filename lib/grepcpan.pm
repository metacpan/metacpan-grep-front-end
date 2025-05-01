package grepcpan;    # the dancer app

# smoke one more time
use Dancer2;
use Dancer2::Serializer::JSON;
use Encode;

use GrepCpan::Grep ();

use GrepCpan::std;

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
    my $q            = param('q');         # FIXME clean query
    my $filetype     = param('qft');
    my $qdistro      = param('qd');
    my $qci          = param('qci');       # case insensitive
    my $qls          = param('qls');       # only list files
    my $page         = param('p') || 1;
    my $file         = param('f');
    my $ignore_files = param('qifl');
    my $query        = $grep->do_search(
        search          => $q,
        page            => $page - 1,
        search_distro   => $qdistro,  # filter on a distribution
        search_file     => $file,
        filetype        => $filetype,
        caseinsensitive => $qci,
        list_files      => $qls,      # not used for now, only impact the view
        ignore_files    => $ignore_files
    );

    my $nopagination = defined $file && length $file ? 1 : 0;
    my $show_sumup   = !$query->{is_a_known_distro}
        ;    #defined $distro && length $distro ? 0 : 1;

    my $template = $qls ? 'list-files' : 'search';

    return template $template => {
        search        => $q,
        search_distro => $qdistro,
        query         => $query,
        page          => $page,
        last_searches => _update_history_cookie($q),
        nopagination  => $nopagination,
        show_sumup    => $show_sumup,
        qft           => $filetype // q{},
        qd            => $qdistro,                     #$qdistro // q{},
        qls           => $qls,
        qci           => $qci,
        qifl          => $ignore_files,
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

sub _update_history_cookie ($search)
{    # and return the human version list in all cases...

    my $separator = q{||};

    my $value = Encode::decode( 'UTF-8', cookie($COOKIE_LAST_SEARCH) );

    my @last_searches = split( qr{\Q$separator\E}, $value // '' );

    if ( defined $search && length $search ) {
        $value =~ s{\Q$separator\E}{.}g if defined $value;    # mmmm
        @last_searches = grep { $_ ne $search }
            @last_searches;    # remove it from history if there
        unshift @last_searches, $search;    # move it first
        @last_searches = splice( @last_searches, 0,
            $Config->{'cookie'}->{'history_size'} );
        cookie
            $COOKIE_LAST_SEARCH =>
            Encode::encode( 'UTF-8', join( $separator, @last_searches ) ),
            expires => "21 days";
    }

    return \@last_searches;
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
    header( 'Cache-Control' => 'max-age=3600' );

    # for CDN, reverse proxies & co
    header(
        'Surrogate-Control' => 'max-age=3600, stale-while-revalidate=60' );
    header( 'Surrogate-Key' => $key );

    return;
}

true;
