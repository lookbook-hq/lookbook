require "lookbook_integration_test"

class WhitespaceTest < LookbookIntegrationTest
  test "the preview HTML is not reformatted" do
    get lookbook_preview_path("whitespace_significant/default")

    assert_element "div"
    assert response.body.include?("<div>one</div><div>two</div><div>three</div>")
  end
end
