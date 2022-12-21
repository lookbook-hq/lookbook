source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
gemspec

gem "standard", "1.19.1"

group :development, :test do
  gem "view_component"
  gem "sqlite3", "~> 1.5"
  gem "combustion", "~> 1.3"
  gem "actionpack"
  gem "appraisal"
  gem "yard-activesupport-concern"
end

group :test do
  gem "factory_bot", require: false
  gem "rspec-rails", ">= 5.0.0"
  gem "capybara", ">= 3.26"
  gem "selenium-webdriver"
  gem "puma"
end
