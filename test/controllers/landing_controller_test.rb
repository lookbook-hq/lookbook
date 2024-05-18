require "test_helper"

class LandingControllerTest < ActionDispatch::IntegrationTest
  describe "root" do
    describe "landing page specified" do
      let(:landing_page) { Lookbook::Pages.find(&:landing?) }

      it "redirects to the landing page" do
        get lookbook.root_path
        assert_redirected_to landing_page.url_path
      end
    end

    describe "no landing page specified" do
      # TODO
    end
  end
end
