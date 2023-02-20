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
        selector = "#previews-nav [data-entity-type=scenario], #previews-nav [data-entity-type=scenario-group]"
        expect(html).to have_selector(selector)
        expect(html.all(selector).count).to eql(visible_scenarios_count)
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
        selector = "#pages-nav [data-entity-type=page]"
        expect(html).to have_selector(selector)
        expect(html.all(selector).count).to eql(visible_pages_count)
      end
    end
  end

  describe "JSON endpoint" do
    it "returns a JSON list of previews with example inspect paths" do
      get lookbook_previews_path(format: :json)

      parsed_response = JSON.parse(response.body)

      expect(
        parsed_response
          .find { |item| item["name"] == "annotated" }["scenarios"]
          .find { |item| item["name"] == "default" }["inspect_path"]
      ).to eq("/lookbook/inspect/foo/bar/annotated/default")
    end
  end
end
