source "https://rubygems.org"
gemspec

rails_version = (ENV["RAILS_VERSION"] || "~> 8.0.0").to_s
gem "rails", (rails_version == "main") ? {git: "https://github.com/rails/rails", ref: "main"} : rails_version

gem "actioncable"
gem "debug", platforms: %i[mri windows], require: "debug/prelude"
gem "listen"
gem "phlex-rails"
gem "propshaft"
gem "puma"
gem "standard"
gem "yard-activesupport-concern"

group :test do
  gem "appraisal"
  gem "cuprite"
  gem "minitest-hooks"
  gem "minitest-reporters"
  gem "sqlite3"
end

# ----- Gems for current RSpec-based test setup (will be removed) ----- #

group :test do
  gem "factory_bot", require: false
  gem "capybara"
  gem "selenium-webdriver"
  gem "rspec-rails", "~> 6"
end
