source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
gemspec

rails_version = (ENV["RAILS_VERSION"] || "~> 7.0.0").to_s

gem "rails", rails_version == "main" ? {git: "https://github.com/rails/rails", ref: "main"} : rails_version

if RUBY_VERSION >= "3.1"
  gem "net-imap", require: false
  gem "net-pop", require: false
  gem "net-smtp", require: false
end

group :development, :test do
  gem "sqlite3", "~> 1.4"
  gem "standard", "~> 1.1"
  gem "combustion", "~> 1.3"
  gem "actionpack"
  gem "appraisal"
end

group :test do
  gem "factory_bot", require: false
  gem "combustion", "~> 1.3"
  gem "capybara"
  gem "rspec-rails", "~> 5"
  gem "selenium-webdriver"
  gem "puma"
end

  
