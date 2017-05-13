requires "Git::Repository" => 0;
requires "Proc::ProcessTable" => 0;
requires "Digest::MD5" => 0;
requires "YAML::Syck" => 0;
requires "Simple::Accessor" => "1.02";
requires "Time::HiRes" => 0;
requires "Test::Harness" => 0;
requires "Dancer2"  => "0";
requires "Template" => 0;
requires "JSON::XS" => 0;
requires "Plack"  => 0;
requires "Plack::Middleware" => 0;
requires "Plack::Middleware::Deflater" => 0;
requires "Plack::Handler::Starman" => 0;
requires "File::Slurp"  => 0;
requires "Fcntl" => 0;
requires "FindBin" => 0;
requires "Cpanel::JSON::XS" => 0;
requires "JSON::MaybeXS" => 0;
requires "HTTP::Entity::Parser" => 0;

recommends "YAML"             => "0";
recommends "URL::Encode::XS"  => "0";
recommends "CGI::Deurl::XS"   => "0";
recommends "HTTP::Parser::XS" => "0";

on "test" => sub {
    requires "Test::More"            => "0";
    requires "HTTP::Request::Common" => "0";
};
