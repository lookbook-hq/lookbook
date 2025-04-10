require "bundler"
require "logger"
Bundler.require :default, :development

require_relative "support/combustion"

require "view_component/test_helpers"
require "factory_bot"
require "rspec/rails"
require "capybara/rspec"

Warning[:deprecated] = true

Dir["./spec/support/**/*.rb"].sort.each { |f| require f }

RSpec.configure do |config|
  config.include ViewComponent::TestHelpers, type: :component
  config.include Capybara::RSpecMatchers, type: :component
  config.include FactoryBot::Syntax::Methods

  config.include ComponentSpecHelper, type: :component
  config.include RequestSpecHelper, type: :request
  config.include AppHelper

  config.include Rails.application.routes.url_helpers
  config.include Lookbook::Engine.routes.url_helpers

  config.filter_rails_from_backtrace!
end

begin
  require "phlex-rails"
  require "phlex/testing/view_helper"
  RSpec.configure { |config| config.include Phlex::Testing::ViewHelper }
rescue LoadError
end
