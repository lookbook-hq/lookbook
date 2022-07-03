require "rails_helper"

RSpec.describe "application", type: :request do

  context "header" do
    before(:context) do
      get lookbook_path
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
    end

    it "is displayed" do
      expect(html).to have_css("#app-main")
    end
  end

  context "with previews" do
    before(:context) do
      load_previews
      get lookbook_path
    end

    context "- sidebar" do
      it "is displayed" do
        expect(html).to have_css("#app-sidebar")
      end

      it "includes the previews nav" do
        expect(html).to have_css("#previews-nav")
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

    context "- sidebar" do
      it "is displayed" do
        expect(html).to have_css("#app-sidebar")
      end

      it "includes the pages nav" do
        expect(html).to have_css("#pages-nav")
      end
    end
    
    after(:context) do
      unload_pages
    end
  end
end
