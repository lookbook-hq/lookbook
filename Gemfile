ruby File.read(".ruby-version")

source "https://rubygems.org"
gemspec

gem "combustion"
gem "phlex-rails"
gem "puma"
gem "rails"
gem "sprockets-rails"
gem "view_component"

group :development, :test do
  gem "better_errors"
  gem "binding_of_caller"
  gem "colorize"
  gem "dry-cli"
  gem "listen"
  gem "rubocop-rails", require: false
  gem "standard", require: false
  gem "tty-prompt"
end

group :test do
  gem "cuprite"
  gem "minitest-hooks"
  gem "minitest-reporters"
end
