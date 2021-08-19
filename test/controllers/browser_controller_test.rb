require "test_helper"

module Lookbook
  class BrowserControllerTest < ActionDispatch::IntegrationTest
    include Engine.routes.url_helpers

    setup do
      @routes = Engine.routes
    end

    context "#index" do
      setup do
        visit lookbook_url
      end

      should "render the welcome content" do
        assert page.has_content?("Select a preview to get started")
      end

      should "include the navigation" do
        assert page.has_css?("#nav")
      end
    end

    context "#show" do
      context "preview not found" do
        setup do
          visit show_url "foo/bar"
        end

        should "display the 'preview not found' message" do
          assert page.has_selector?("[data-role='preview-not-found']")
        end
      end
    end
  end
end
