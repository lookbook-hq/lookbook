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

      it "includes the expected number of examples" do
        visible_examples_count = 0
        Lookbook.previews.select { |p| !p.hidden? }.each do |preview|
          visible_examples_count += preview.visible_examples.count
        end
        expect(html).to have_selector("#previews-nav [data-entity-type=example], #previews-nav [data-entity-type=group]")
        expect(html.all("#previews-nav [data-entity-type=example], #previews-nav [data-entity-type=group]").count).to eql(visible_examples_count)
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
        visible_pages_count = Lookbook.pages.count { |p| !p.hidden? }
        expect(html).to have_css("#pages-nav [data-entity-type=page]")
        expect(html.all("#pages-nav [data-entity-type=page]").count).to eql(visible_pages_count)
      end
    end
  end

  describe "JSON endpoint" do
    it "returns a JSON list of previews with example paths" do
      get lookbook_previews_path(format: :json)

      parsed_response = JSON.parse(response.body)

      expect(
        parsed_response
          .find { |item| item["name"] == "annotated" }["examples"]
          .find { |item| item["name"] == "default" }["inspect_path"]
      ).to eq("/lookbook/inspect/foo/bar/annotated/default")

      expect(
        parsed_response
          .find { |item| item["name"] == "annotated" }["examples"]
          .find { |item| item["name"] == "default" }["preview_path"]
      ).to eq("/lookbook/preview/foo/bar/annotated/default")
    end
  end
end
