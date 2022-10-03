source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
gemspec

if RUBY_VERSION >= "3.1"
  gem "net-imap", require: false
  gem "net-pop", require: false
  gem "net-smtp", require: false
end

group :development, :test do
  gem "sqlite3", "~> 1.5"
  gem "standard", "~> 1.1"
  gem "combustion", "~> 1.3"
  gem "actionpack"
  gem "appraisal"
end

group :test do
  gem "factory_bot", require: false
  gem "rspec-rails", "~> 5"
  gem "capybara", ">= 3.26"
  gem "selenium-webdriver"
  gem "puma"
end
