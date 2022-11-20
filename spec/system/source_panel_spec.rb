require "rails_helper"

RSpec.describe "Source panel", type: :system do
  context "custom source file provided by @source tag" do
    it "renders the file contents" do
      visit lookbook_inspect_path("custom_source")

      click_on("Source")

      within("#panel-source .code") do
        expect(page).to have_content "export default {}"
      end
    end
  end
end
