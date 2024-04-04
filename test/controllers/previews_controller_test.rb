require "test_helper"

class PreviewsControllerTest < ActionDispatch::IntegrationTest
  include LookbookPathHelpers

  describe "#preview" do
    describe "ViewComponent preview" do
      it "renders" do
        get scenario_preview_path(Elements::ButtonComponentPreview, :default)
        assert_response :success
      end
    end

    describe "ActionView partial preview" do
      it "renders" do
        get scenario_preview_path(Elements::AccordionComponentPreview, :default)
        assert_response :success
      end
    end

    describe "Mailer preview" do
      it "renders" do
        get scenario_preview_path(UserMailerPreview, :welcome)
        assert_response :success
      end
    end
  end
end
