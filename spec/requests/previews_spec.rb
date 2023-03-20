require "rails_helper"

RSpec.describe "previews", type: :request do
  context "ViewComponents" do
    it "renders view component previews" do
      get lookbook_preview_path("view_component_example/default")

      expect(html).to have_content "viewcomponent component"
    end

    it "supports output transformation" do
      get lookbook_preview_path("view_component_example/transform")

      expect(html.has_css?("span", text: "transformed")).to be true
    end
  end

  if AppHelper.phlexible?
    context "Phlex components" do
      it "renders Phlex component previews" do
        get lookbook_preview_path("phlex_example/default")

        expect(html.has_css?("p", text: "phlex component")).to be true
      end

      it "supports helpers" do
        get lookbook_preview_path("phlex_example/helpers")

        expect(html).to have_content "http://localhost/"
      end

      it "supports output transformation" do
        get lookbook_preview_path("phlex_example/transform")

        expect(html.has_css?("span", text: "transformed")).to be true
      end
    end
  end

  context "View partials" do
    it "renders view partial previews" do
      get lookbook_preview_path("partial_example/default")

      expect(html.has_css?("p", text: "view partial")).to be true
    end

    it "supports helpers" do
      get lookbook_preview_path("partial_example/helpers")

      expect(html).to have_content "http://localhost/"
    end

    it "supports output transformation" do
      get lookbook_preview_path("phlex_example/transform")

      expect(html.has_css?("span", text: "transformed")).to be true
    end
  end
end
