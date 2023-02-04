require "rails_helper"

RSpec.describe "Output panel", type: :system do
  context "multi-line tags" do
    it "does not raise an exception" do
      visit lookbook_inspect_path("multiline_tag")

      click_on("HTML")

      expect(page).to have_css "#panel-output .code"
    end
  end

  context "with nested components" do
    it "renders the parent component" do
      visit lookbook_inspect_path("nested")

      expect(page).to have_text "I work!"
    end
  end
end
