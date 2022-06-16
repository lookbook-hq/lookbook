require "rails_helper"

RSpec.describe "pages", type: :request do
  context "default" do
    it "should display the page header" do
      get Lookbook.pages.find("with_header").url_path
      expect(html).to have_css("#page-header")
    end

    it "should display the page content" do
      get Lookbook.pages.find("overview").url_path
      expect(html).to have_css("#page-content")
    end
  end

  context "with tabs" do
    it "should display the tabs" do
      get Lookbook.pages.find("sections").url_path
      expect(html).to have_css("#page-tabbed-sections")
    end
  end
end
