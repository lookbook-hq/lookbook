require "rails_helper"

RSpec.describe "Params editor", type: :system do
  context "text-field" do
    before do
      visit lookbook_inspect_path("standard/scenario_with_params")
    end

    it "updates rendered HTML when the field content changes" do
      content = "This is the title"

      within("#app-main") do
        click_on "Params"
        fill_in "param-title", with: content
        click_on "HTML"
      end

      within("[data-panel=output]") do
        expect(page).to have_text(content)
      end
    end

    it "handles quotes and other tricky characters" do
      content = "some ' \" odd \\ chars &+;"

      within("#app-main") do
        click_on "Params"
        fill_in "param-title", with: content
        click_on "HTML"
      end

      within("[data-panel=output]") do
        expect(page).to have_text(content)
      end
    end
  end

  context "textarea" do
    before do
      visit lookbook_inspect_path("params/dynamic_args")
    end

    it "properly interprets values with newlines" do
      within("#app-main") do
        click_on "Params"
      end

      expect(page.find("textarea").value).to eql ParamsComponentPreview::TEXT
    end
  end
end
