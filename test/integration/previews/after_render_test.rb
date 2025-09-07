require "lookbook_integration_test"

class AfterRenderTest < LookbookIntegrationTest
  test "preview class @after_render" do
    get lookbook_preview_path("after_render_components/default")

    assert_element "em", text: "preview"
    assert_content "default after render content"
  end

  test "supports scenario after_render" do
    get lookbook_preview_path("after_render_components/custom")

    assert_element "strong", text: "scenario"
    assert_content "custom after render content"
  end

  test "provides context information" do
    get lookbook_preview_path("after_render_components/with_context")

    assert_element "strong", text: "with_context"
    assert_content "after render using context info"
  end

  describe "ViewComponent::Preview base class" do
    test "supports preview class after_render" do
      get lookbook_preview_path("after_render_view_components/default")

      assert_element "em", text: "preview"
      assert_content "default after render content"
    end

    test "supports scenario after_render" do
      get lookbook_preview_path("after_render_view_components/custom")

      assert_element "strong", text: "scenario"
      assert_content "custom after render content"
    end
  end
end
