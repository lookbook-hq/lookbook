ENV["RAILS_ENV"] = "test"

require "active_support/test_case"
require "active_support/testing/autorun"
require "capybara/rails"
require "capybara/cuprite"
require "capybara/minitest"
require "capybara/minitest/spec"
require "minitest/reporters"
require "minitest/autorun"

require_relative "support/lookbook_helper"
require_relative "dummy/config/environment"

Capybara.register_driver(:cuprite) do |app|
  Capybara::Cuprite::Driver.new(app, window_size: [1200, 800],
    browser_options: {},
    process_timeout: 10,
    inspector: true,
    headless: !ENV["HEADLESS"].in?(%w[n 0 no false]))
end

Capybara.default_driver = Capybara.javascript_driver = :cuprite

class ActiveSupport::TestCase
  extend Minitest::Spec::DSL
  include LookbookHelper
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  extend Minitest::Spec::DSL
  include Capybara::DSL
  include Capybara::Minitest::Assertions
  include LookbookHelper

  setup do
    @routes = Lookbook::Engine.routes
  end

  driven_by :cuprite
end

class ActionDispatch::IntegrationTest
  extend Minitest::Spec::DSL
  include Capybara::DSL
  include Capybara::Minitest::Assertions
  include LookbookHelper

  setup do
    @routes = Lookbook::Engine.routes
  end

  teardown do
    Capybara.reset_sessions!
  end
end

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new
