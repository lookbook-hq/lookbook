require "rails_helper"

RSpec.describe "previews", type: :request do
  context "param default values" do
    it "renders previews with non-static default param values" do
      get lookbook_preview_path("params/dynamic_args")

      expect(html).to have_content "the default value"
    end
  end

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

        expect(html.has_css?("p", text: "phlex component")).to be true
      end

      it "supports helpers" do
        get lookbook_preview_path("phlex_example/helpers")

        expect(html).to have_selector "a[href='/']"
      end

      it "renders builder-style components" do
        get lookbook_preview_path("phlex_example/builder")

        expect(html.has_css?("li", text: "Hello")).to be true
        expect(html.has_css?("li", text: "World")).to be true
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

      expect(html).to have_selector "a[href='/']"
    end

    it "has access to host app url helpers" do
      get lookbook_preview_path("partial_example/url_helpers")
      puts html.native.inner_html
      expect(html).to have_selector "a[href='/blog']"
    end
  end

  context "after_render" do
    it "supports preview class after_render" do
      get lookbook_preview_path("after_render/default")

      expect(html.has_css?("em", text: "preview")).to be true
      expect(html).to have_content "default after render content"
    end

    it "supports scenario after_render" do
      get lookbook_preview_path("after_render/custom")

      expect(html.has_css?("strong", text: "scenario")).to be true
      expect(html).to have_content "custom after render content"
    end

    it "provides context information" do
      get lookbook_preview_path("after_render/with_context")

      expect(html.has_css?("strong", text: "with_context")).to be true
      expect(html).to have_content "after render using context info"
    end

    context "in ViewComponent::Preview" do
      it "supports preview class after_render" do
        get lookbook_preview_path("after_render_view_component_example/default")

        expect(html.has_css?("em", text: "preview")).to be true
        expect(html).to have_content "default after render content"
      end

      it "supports scenario after_render" do
        get lookbook_preview_path("after_render_view_component_example/custom")

        expect(html.has_css?("strong", text: "scenario")).to be true
        expect(html).to have_content "custom after render content"
      end
    end
  end
end
