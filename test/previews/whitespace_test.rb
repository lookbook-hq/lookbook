require "test_helper"

class WhitespaceTest < ActionDispatch::IntegrationTest
  test "the rendered output HTML is not reformatted for the preview" do
    get lookbook_preview_path("whitespace_significant/default")

    assert_element "div"
    assert response.body.include?("<div>one</div><div>two</div><div>three</div>")
  end
end
