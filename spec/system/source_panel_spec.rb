require "rails_helper"

RSpec.describe "Output panel", type: :system do
  context "multi-line tags" do
    it "does not raise an exception" do
      visit lookbook_inspect_path("multiline_tag")

      click_on("HTML")

      expect(page).to have_css "#lookbook-panel-output .code"
    end
  end
end
