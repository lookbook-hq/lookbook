require "test_helper"

class PreviewsControllerTest < ActionDispatch::IntegrationTest
  include Lookbook::UrlHelper

  describe "#inspect" do
    before do
      get Lookbook::Previews.first.inspector_targets.first.url_path
    end

    it "renders successfully" do
      assert_response :success
    end

    it "displays the preview inspector component" do
      assert_select "[data-component='preview-inspector']"
    end
  end

  describe "#embed" do
    before do
      preview = Lookbook::Previews.first
      get preview_embed_path(preview, preview.inspector_targets.first)
    end

    it "renders successfully" do
      assert_response :success
    end

    it "displays the preview embed component" do
      assert_select "[data-component='preview-embed']"
    end
  end

  describe "#preview" do
    describe "ViewComponent preview" do
      it "renders" do
        get preview_target_path(Elements::ButtonComponentPreview, :default)
        assert_response :success
      end
    end

    describe "Phlex preview" do
      it "renders" do
        get preview_target_path(Elements::DropdownMenuComponentPreview, :default)
        assert_response :success
      end
    end

    describe "ActionView partial preview" do
      it "renders" do
        get preview_target_path(Elements::AccordionComponentPreview, :default)
        assert_response :success
      end
    end

    describe "Mailer preview" do
      it "renders" do
        get preview_target_path(Emails::UserMailerPreview, :welcome)
        assert_response :success
      end
    end
  end
end
