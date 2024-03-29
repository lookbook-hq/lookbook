require "test_helper"

class ApplicationControllerTest < ActionDispatch::IntegrationTest
  describe "root" do
    it "renders" do
      get lookbook.root_url
      assert_response :success
    end
  end
end
