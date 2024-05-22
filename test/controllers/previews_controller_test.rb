require "test_helper"

class PreviewsControllerTest < ActionDispatch::IntegrationTest
  include Lookbook::UrlHelper
  describe "#index" do
    it "redirects HTML requests to the root path" do
      get lookbook.previews_path
      assert_redirected_to lookbook.root_path
    end

    it "returns previews JSON for JSON requests" do
      get lookbook.previews_path, as: :json

      assert_response :success

      previews = JSON.parse(response.body)
      assert_kind_of(Array, previews)

      preview = previews.first.symbolize_keys!
      assert_kind_of(Hash, preview)

      assert_kind_of(String, preview[:id])
      assert_kind_of(String, preview[:uuid])
      assert_kind_of(String, preview[:name])
      assert_kind_of(String, preview[:label])
      assert_kind_of(Array, preview[:scenarios])
    end
  end

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
