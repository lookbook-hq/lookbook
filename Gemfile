source "https://rubygems.org"
gemspec

rails_version = (ENV["RAILS_VERSION"] || "~> 8.0.0").to_s
gem "rails", (rails_version == "main") ? {git: "https://github.com/rails/rails", ref: "main"} : rails_version

gem "combustion", "~> 1.3"
gem "standard"
gem "yard-activesupport-concern"

# ----- Gems for current RSpec-based test setup (will be removed) ----- #

group :test do
  gem "appraisal"
  gem "phlex-rails", "~> 1.2.2", require: false
  gem "factory_bot", require: false
  gem "capybara"
  gem "selenium-webdriver"
  gem "puma"
  gem "rspec-rails", "~> 6"
end

# ----- Gems for new dev/test setup ----- #

gem "sprockets-rails", require: "sprockets/railtie"

group :test do
  gem "cuprite"
  gem "minitest-hooks"
  gem "minitest-reporters"
end
