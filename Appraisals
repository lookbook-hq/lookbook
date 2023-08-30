# frozen_string_literal: true

appraise "rails-6.0" do
  gem "rails", "~> 6.0.0"
  gem "rspec-rails", "~> 5"
  gem "selenium-webdriver", (RUBY_VERSION > "3.0.0") ? "4.11.0" : "4.9.0"
end

appraise "rails-6.1" do
  gem "rails", "~> 6.1.0"
  gem "rspec-rails", "~> 6"
  gem "selenium-webdriver", (RUBY_VERSION > "3.0.0") ? "4.11.0" : "4.9.0"

  # Required for Ruby 3.1.0
  gem "net-smtp", require: false
  gem "net-imap", require: false
  gem "net-pop", require: false
end

appraise "rails-7.0" do
  gem "rails", "~> 7.0.0"
  gem "rspec-rails", "~> 6"
  gem "selenium-webdriver", (RUBY_VERSION > "3.0.0") ? "4.11.0" : "4.9.0"
end

appraise "rails-head" do
  gem "rails", github: "rails/rails", branch: "main"
  gem "rspec-rails", "~> 6"
  gem "selenium-webdriver", (RUBY_VERSION > "3.0.0") ? "4.11.0" : "4.9.0"
end
