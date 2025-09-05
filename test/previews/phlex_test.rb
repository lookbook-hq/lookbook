require "test_helper"

module Lookbook
  class PhlexTest < ActionDispatch::IntegrationTest
    test "Phlex components can be rendered" do
      get lookbook_preview_path("test_suite_previews/phlex_components/default")

      assert_element "p", text: "phlex component"
    end

    test "helpers support" do
      skip("helpers setup in test app needs fixing")

      get lookbook_preview_path("test_suite_previews/phlex_components/helpers")

      assert_link "/"
    end

    test "builder-style components" do
      get lookbook_preview_path("test_suite_previews/phlex_components/builder")

      assert_element "li", text: "Hello"
      assert_element "li", text: "World"
    end
  end
end
