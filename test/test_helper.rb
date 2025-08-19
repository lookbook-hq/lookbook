ENV["RAILS_ENV"] = "test"

require "bundler"
Bundler.require :default, :test

require "rails/test_help"
require "capybara/rails"
require "capybara/cuprite"
require "capybara/minitest"
require "capybara/minitest/spec"
require "minitest/reporters"
require "minitest/autorun"

require_relative "demo/config/application"

# Capybara.javascript_driver = :cuprite
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
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  extend Minitest::Spec::DSL
  include Capybara::DSL
  include Capybara::Minitest::Assertions

  driven_by :cuprite
end

class ActionDispatch::IntegrationTest
  extend Minitest::Spec::DSL
  include Capybara::DSL
  include Capybara::Minitest::Assertions

  teardown do
    Capybara.reset_sessions!
  end
end

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new
