require "rails_helper"

RSpec.describe "landing", type: :request do
  
  xcontext "no previews or pages" do
    before(:context) do
      get lookbook_path
    end

    it "shows the welcome screen" do
      expect(html).to have_css("#landing")
    end
  end

  xcontext "with previews only" do
    before(:context) do
      load_previews
      get lookbook_path
      follow_redirect!
    end

    it "shows the landing page" do
      expect(html).to have_css("#landing-with-content")
    end
    
    after(:context) do
      unload_previews
    end
  end

  context "with pages" do
    before(:context) do
      load_pages
      get lookbook_path
    end

    it "redirects to the landing page" do
      expect(html).to redirect_to Lookbook.pages.find(&:landing).url_path
    end

    after(:context) do
      unload_pages
    end
  end
end
