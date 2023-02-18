source "https://rubygems.org"
gemspec

rails_version = (ENV["RAILS_VERSION"] || "~> 7.0.0").to_s
gem "rails", (rails_version == "main") ? {git: "https://github.com/rails/rails", ref: "main"} : rails_version

group :development, :test do
  gem "appraisal", github: "thoughtbot/appraisal"
  gem "phlex-rails"
  gem "standard", "1.19.1"
  gem "view_component"
  gem "combustion", "~> 1.3"
  gem "yard-activesupport-concern"
end

group :test do
  gem "factory_bot", require: false
  gem "rspec-rails", "~> 5"
  gem "capybara", "~> 3"
  gem "selenium-webdriver", "~> 4"
  gem "puma", "~> 5"
end