require "test_helper"

class LookbookIntegrationTest < ActionDispatch::IntegrationTest
  extend Minitest::Spec::DSL
  include Capybara::Minitest::Assertions
  include LookbookTestUtils

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
