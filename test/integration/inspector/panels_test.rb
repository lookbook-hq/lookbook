require "lookbook_integration_test"

class PanelsTest < LookbookIntegrationTest
  test "preview class @after_render" do
    get lookbook_preview_path("after_render_components/default")

    assert_element "em", text: "preview"
    assert_content "default after render content"
  end
end
