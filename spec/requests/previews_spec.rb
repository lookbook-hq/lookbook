require "rails_helper"

RSpec.describe "previews", type: :request do
  context "ViewComponents" do
    it "renders view component previews" do
      get lookbook_preview_path("view_component_example/default")

      expect(html).to have_content "viewcomponent component"
    end
  end

  if AppHelper.phlexible?
    context "Phlex components" do
      it "renders Phlex component previews" do
        get lookbook_preview_path("phlex_example/default")

        expect(html).to have_css "p", text: "phlex component"
      end

      it "supports helpers" do
        get lookbook_preview_path("phlex_example/helpers")

        expect(html).to have_content "http://localhost/"
      end
    end
  end

  context "View partials" do
    it "renders view partial previews" do
      get lookbook_preview_path("partial_example/default")

      expect(html).to have_css "p", text: "view partial"
    end

    it "supports helpers" do
      get lookbook_preview_path("partial_example/helpers")

      expect(html).to have_content "http://localhost/"
    end
  end
end
