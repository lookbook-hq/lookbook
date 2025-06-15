source "https://rubygems.org"
gemspec

rails_version = (ENV["RAILS_VERSION"] || "~> 8.0.0").to_s
gem "rails", (rails_version == "main") ? {git: "https://github.com/rails/rails", ref: "main"} : rails_version

gem "combustion", "~> 1.3"
gem "standard"
gem "view_component", "4.0.0.alpha6"
gem "yard-activesupport-concern"

group :test do
  gem "appraisal"
  gem "phlex-rails", "~> 1.2.2", require: false
  gem "factory_bot", require: false
  gem "capybara", "~> 3.39"
  gem "selenium-webdriver", "4.17.0"
  gem "puma", "~> 6"
  gem "rspec-rails", "~> 6"
end
