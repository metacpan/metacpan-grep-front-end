use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

# Valid patterns — _validate_pcre_pattern returns undef
my @valid = (
    q{\d+},
    q{[a-z]+},
    q{\bfoo\b},
    q{foo(bar)?},
    q{\(\{\d+(,\d+)?\}},
    q{open\(},
    q{^start},
    q{end$},
    q{a|b|c},
);

# Fixed-string searches — always valid (skipped by validator)
my @fixed = (
    undef,
    q{hello world},
    q{simple},
);

# Invalid PCRE patterns — returns an error string
my @invalid = (
    q{open(},          # unmatched paren
    q{[unclosed},      # unmatched bracket
    q{*greedy},        # quantifier without target
    q{+also bad},      # quantifier without target
    q{(?P<broken},     # incomplete named group
);

for my $pattern (@valid) {
    is GrepCpan::Grep::_validate_pcre_pattern($pattern), undef,
        "valid PCRE: $pattern";
}

for my $pattern (@fixed) {
    is GrepCpan::Grep::_validate_pcre_pattern($pattern), undef,
        "fixed-string (skipped): " . ( $pattern // 'undef' );
}

for my $pattern (@invalid) {
    my $err = GrepCpan::Grep::_validate_pcre_pattern($pattern);
    ok defined $err, "invalid PCRE detected: $pattern";
    ok length($err) > 0, "error message is not empty for: $pattern";
}

done_testing;
