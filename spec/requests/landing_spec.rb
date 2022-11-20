require "rails_helper"

RSpec.describe "landing", type: :request do
  context "with pages present" do
    before(:context) do
      get lookbook_home_path
    end

    it "redirects to the landing page" do
      expect(html).to redirect_to Lookbook.pages.find(&:landing?).url_path
    end
  end
end
