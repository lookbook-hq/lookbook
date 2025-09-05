require "test_helper"

module Lookbook
  class ViewComponentsTest < ActionDispatch::IntegrationTest
    test "ViewComponents can be rendered" do
      get lookbook_preview_path("test_suite_previews/view_components/paragraph")

      assert_element "p", text: "A paragraph"
    end
  end
end
