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

Capybara.default_driver = :cuprite
Capybara.javascript_driver = :cuprite
Capybara.register_driver(:cuprite) do |app|
  Capybara::Cuprite::Driver.new(app, window_size: [1200, 800])
end

ActiveSupport.on_load :action_dispatch_integration_test do
  include(Module.new do
    extend ActiveSupport::Concern

    included do
      extend Minitest::Spec::DSL
      include Capybara::Minitest::Assertions
      include LookbookHelper

      setup do
        @routes = Lookbook::Engine.routes

        integration_session.extend(Module.new do
          def page
            @page ||= ::Capybara::Session.new(:rack_test, @app)
          end

          def _mock_session
            @_mock_session ||= page.driver.browser.rack_mock_session
          end
        end)
      end

      teardown do
        Capybara.reset_sessions!
      end
    end
  end)
end

ActiveSupport.on_load :action_dispatch_system_test_case do
  include(Module.new do
    extend ActiveSupport::Concern

    included do
      extend Minitest::Spec::DSL
      include Capybara::DSL
      include Capybara::Minitest::Assertions
      include LookbookHelper

      driven_by :cuprite

      setup do
        @routes = Lookbook::Engine.routes
      end

      teardown do
        Capybara.reset_sessions!
      end
    end
  end)
end

class ActiveSupport::TestCase
  extend Minitest::Spec::DSL
  include LookbookHelper
end

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new
