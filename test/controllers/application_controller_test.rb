require "test_helper"

class ApplicationControllerTest < ActionDispatch::IntegrationTest
  describe "No matching Lookbook route" do
    it "renders a generic 404 page with the correct status" do
      get "#{lookbook.root_path}/foobar"

      assert_response :missing
      assert_select "[data-component='system-message'] [data-role='title']", "Not found"
    end
  end
end
