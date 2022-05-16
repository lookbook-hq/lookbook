require "bundler"

Bundler.require :default, :development

Combustion.path = "spec/dummy"
Combustion.initialize! :action_controller, :action_view

require "view_component/test_helpers"
require "rspec/rails"
require "capybara/rspec"
require_relative "support/components_helper"

RSpec.configure do |config|
  config.include ViewComponent::TestHelpers, type: :component
  config.include Capybara::RSpecMatchers, type: :component

  config.filter_rails_from_backtrace!
end
