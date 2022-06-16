require "rails_helper"

RSpec.describe "application", type: :request do

  before { get Lookbook.pages.first.url_path }

  context "header" do
    it "is displayed" do
      expect(html).to have_css("[data-component=header]#app-header")
    end

    it "includes the project name" do
      expect(html).to have_content(Lookbook.config.project_name)
    end
  end

  context "sidebar" do
    it "is displayed" do
      expect(html).to have_css("#app-sidebar")
    end

    it "includes the previews nav" do
      expect(html).to have_css("#previews-nav")
    end

    it "includes the pages nav" do
      expect(html).to have_css("#pages-nav")
    end
  end

  context "main" do
    it "is displayed" do
      expect(html).to have_css("#app-main")
    end
  end
end
