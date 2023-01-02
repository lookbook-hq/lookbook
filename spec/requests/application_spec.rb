require "rails_helper"

RSpec.describe "application", type: :request do
  context "header" do
    before(:context) do
      get lookbook_home_path
      follow_redirect!
    end

    it "is displayed" do
      expect(html).to have_css("[data-component=header]#app-header")
    end

    it "includes the project name" do
      expect(html).to have_content(Lookbook.config.project_name)
    end
  end

  context "main" do
    before(:context) do
      get lookbook_home_path
      follow_redirect!
    end

    it "is displayed" do
      expect(html).to have_css("#app-main")
    end
  end

  context "with previews" do
    before(:context) do
      get lookbook_home_path
      follow_redirect!
    end

    it "displays the sidebar" do
      expect(html).to have_css("#app-sidebar")
    end

    context "navigation" do
      it "is shown" do
        expect(html).to have_css("#previews-nav")
      end

      it "includes the expected number of scenarios" do
        visible_scenarios_count = 0
        Lookbook::Engine.previews.select { |p| !p.hidden? }.each do |preview|
          visible_scenarios_count += preview.visible_scenarios.count
        end
        expect(html).to have_css("#previews-nav [data-entity-type=scenario], #previews-nav [data-entity-type=group]", count: visible_scenarios_count)
      end
    end
  end

  context "with pages" do
    before(:context) do
      get lookbook_home_path
      follow_redirect!
    end

    it "displays the sidebar" do
      expect(html).to have_css("#app-sidebar")
    end

    context "navigation" do
      it "is shown" do
        expect(html).to have_css("#pages-nav")
      end

      it "includes the expected number of pages" do
        visible_pages_count = Lookbook::Engine.pages.count { |p| !p.hidden? }
        expect(html).to have_css("#pages-nav [data-entity-type=page]", count: visible_pages_count)
      end
    end
  end
end
