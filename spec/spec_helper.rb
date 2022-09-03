require "bundler"

Bundler.require :default, :development

require_relative "support/combustion"

require "factory_bot"
require "view_component/test_helpers"
require "rspec/rails"
require "capybara/rspec"
require_relative "support/component_spec_helper"
require_relative "support/request_spec_helper"
require_relative "support/paths_helper"
require_relative "support/factories"

RSpec.configure do |config|
  config.include ViewComponent::TestHelpers, type: :component
  config.include Capybara::RSpecMatchers, type: :component
  config.include FactoryBot::Syntax::Methods

  config.include ComponentSpecHelper, type: :component
  config.include RequestSpecHelper, type: :request
  config.include PathsHelper

  config.include Rails.application.routes.url_helpers
  config.include Lookbook::Engine.routes.url_helpers

  config.filter_rails_from_backtrace!
end
