require "rails_helper"

RSpec.describe "landing", type: :request do
  context "with previews and pages" do

    it "redirects to the landing page" do
      get lookbook_path
      expect(html).to redirect_to Lookbook.pages.find(&:landing).url_path
    end

  end

  xcontext "no previews or pages" do
    
    before do
      File.rename Rails.root.join("test/components"), Rails.root.join("test/not-components")
    end

    it "shows the welcome screen" do
      get lookbook_path
      expect(html).to have_css("#welcome-message")
    end

    after do
      File.rename Rails.root.join("test/not-components"), Rails.root.join("test/components")
    end
  end
end
