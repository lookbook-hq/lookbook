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

  context "with a table of contents" do
    it "should render the table of contents if `toc: true` in frontmatter" do
      get Lookbook::Engine.pages.find_by_path("with_toc").url_path
      expect(html).to have_css("ul li a[href='#introduction']")
      expect(html).to have_css("#introduction")
      expect(html).to have_css("ul li ul li ul li a[href='#subsection-2']")
    end

    it "should not attempt to render table of contents if `toc: true` in frontmatter of HTML pages" do
      get Lookbook::Engine.pages.find_by_path("no_toc_on_html").url_path
      expect(html).to_not have_css("ul li a[href='#introduction']")
    end
  end
end
