require "rails_helper"

RSpec.describe "application", type: :request do
  context "header" do
    before(:context) do
      get lookbook_path
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
      get lookbook_path
      follow_redirect!
    end

    it "is displayed" do
      expect(html).to have_css("#app-main")
    end
  end

  context "with previews" do
    before(:context) do
      load_previews
      get lookbook_path
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
          visible_examples_count += preview.examples.count { |e| !e.hidden? }
        end
        expect(html).to have_css("#previews-nav [data-entity-type=example]", count: visible_examples_count)
      end
    end

    after(:context) do
      unload_previews
    end
  end

  context "with pages" do
    before(:context) do
      load_pages
      get lookbook_path
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
        expect(html).to have_css("#pages-nav [data-entity-type=page]", count: visible_pages_count)
      end
    end

    after(:context) do
      unload_pages
    end
  end
end
