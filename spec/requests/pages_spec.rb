require "rails_helper"

RSpec.describe "pages", type: :request do
  context "default" do
    it "should display the page header" do
      get Lookbook::Engine.pages.find_by_path("with_header").url_path
      expect(html).to have_css("#page-header")
    end

    it "should display the page content" do
      get Lookbook::Engine.pages.find_by_path("overview").url_path
      expect(html).to have_css("#page-content")
    end

    it "should add id to headings" do
      get Lookbook::Engine.pages.find_by_path("overview").url_path
      expect(html).to have_css("#page-content h2#heading-2")
      expect(html).to have_css("#page-content h3#heading-3")
    end

    it "includes the pages nav" do
      get Lookbook::Engine.pages.find_by_path("overview").url_path
      expect(html).to have_css("#pages-nav")
    end
  end

  context "with tabs" do
    it "should display the tabs" do
      get Lookbook::Engine.pages.find_by_path("sections").url_path
      expect(html).to have_css("#page-tabbed-sections")
    end
  end

  context "with code helper" do
    it "should display the highlighted code" do
      get Lookbook::Engine.pages.find_by_path("code").url_path
      expect(html).to have_css("[data-component=code] [data-lang=html]")
      expect(html).to have_css("[data-component=code] [data-lang=ruby]")
    end
  end
end
