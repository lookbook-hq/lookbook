require "lookbook_integration_test"

class ViewComponentsTest < LookbookIntegrationTest
  test "ViewComponents can be rendered" do
    get lookbook_preview_path("view_components/paragraph")

    assert_element "p", text: "A paragraph"
  end
end
