require "rails_helper"

RSpec.describe "Params editor", js: true, type: :system do
  context "text-field" do
    it "updates rendered HTML when the field content changes" do
      content = "This is the title"

      visit lookbook_inspect_path("standard/example_with_params")

      click_on "Params"
      fill_in "param-title", with: content
      click_on "HTML"

      within("#inspector-panel-output") do
        expect(page).to have_text(content)
      end
    end

    it "handles quotes and other tricky characters" do
      content = "some ' \" odd \\ chars &+;"

      visit lookbook_inspect_path("standard/example_with_params")

      click_on "Params"
      fill_in "param-title", with: content
      click_on "HTML"

      within("#inspector-panel-output") do
        expect(page).to have_text(content)
      end
    end
  end
end
