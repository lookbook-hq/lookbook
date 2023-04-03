source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
gemspec

gem "standard", "1.26.0"

group :development, :test do
  gem "sqlite3", "~> 1.5"
  gem "combustion", "~> 1.3"
  gem "actionpack"
  gem "appraisal"
end

group :test do
  gem "factory_bot", require: false
  gem "rspec-rails", ">= 5.0.0"
  gem "capybara", ">= 3.26"
  gem "selenium-webdriver"
  gem "puma"
end
