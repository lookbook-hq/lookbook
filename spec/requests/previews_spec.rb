require "rails_helper"

RSpec.describe "previews", type: :request do
  context "ViewComponents" do
    it "renders view component previews" do
      get lookbook_preview_path("view_component_example/default")

      expect(html).to have_content "viewcomponent component"
    end
  end

  context "Phlex components" do
    it "renders Phlex component previews" do
      get lookbook_preview_path("phlex_example/default")

      expect(html).to have_content "phlex component"
    end
  end

  context "View partials" do
    it "renders view partial previews" do
      get lookbook_preview_path("partial_example/default")

      expect(html).to have_content "view partial"
    end
  end
end
