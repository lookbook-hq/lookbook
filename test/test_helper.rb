ENV["RAILS_ENV"] = "test"

require "lookbook"
require "capybara/cuprite"
require "capybara/minitest"
require "capybara/minitest/spec"
require "minitest/reporters"

require_relative "lookbook_test_utils"
require_relative "dummy/config/environment"

require "rails/test_help"

Capybara.default_driver = :cuprite
Capybara.javascript_driver = :cuprite
Capybara.register_driver(:cuprite) do |app|
  Capybara::Cuprite::Driver.new(app, window_size: [1200, 800])
end

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new

ActiveSupport::Deprecation.silenced = true if ActiveSupport::Deprecation.respond_to?(:silenced=)
