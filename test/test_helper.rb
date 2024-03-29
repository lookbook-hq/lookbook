ENV["RAILS_ENV"] ||= "test"

require "bundler"

Bundler.require :default, :development

require_relative "support/combustion"
require "minitest/hooks"
require "minitest/reporters"
require "minitest/autorun"
require "rails/test_help"
require "capybara/cuprite"

Minitest::Reporters.use!

class ActiveSupport::TestCase
  extend Minitest::Spec::DSL
end

class ActionDispatch::IntegrationTest
  extend Minitest::Spec::DSL
end

class ActionDispatch::SystemTestCase
  extend Minitest::Spec::DSL
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :cuprite, using: :headless_chrome, screen_size: [1400, 1400]
end
