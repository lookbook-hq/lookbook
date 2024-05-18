require "test_helper"

class PreviewsControllerTest < ActionDispatch::IntegrationTest
  include Lookbook::PathHelper

  describe "#inspect" do
    describe "ViewComponent preview" do
      it "renders" do
        get inspect_target_path(Elements::ButtonComponentPreview, :default)
        assert_response :success
      end
    end

    describe "Phlex preview" do
      it "renders" do
        get inspect_target_path(Elements::DropdownMenuComponentPreview, :default)
        assert_response :success
      end
    end

    describe "ActionView partial preview" do
      it "renders" do
        get inspect_target_path(Elements::AccordionComponentPreview, :default)
        assert_response :success
      end
    end

    describe "Mailer preview" do
      it "renders" do
        get inspect_target_path(Emails::UserMailerPreview, :welcome)
        assert_response :success
      end
    end
  end
end
