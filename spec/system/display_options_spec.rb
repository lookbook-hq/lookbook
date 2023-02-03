require "rails_helper"

RSpec.describe "Display options", type: :system do
  after do
    Lookbook.config.preview_display_options = {}
  end

  context "dynamic options" do
    context "no options configured" do
      it "does not show display controls if no dynamic options have been specified" do
        visit lookbook_inspect_path("standard/default")

        expect(page).not_to have_css("[data-component=display-options-editors]")
      end
    end

    context "one option configured" do
      before do
        Lookbook.config.preview_display_options = {
          theme: ["light", "dark"]
        }

        visit lookbook_inspect_path("standard/default")
      end

      it "shows the display control in the toolbar" do
        within "#main-toolbar" do
          expect(page).to have_css("[data-component=display-options-editor]")
          expect(page).to have_select("theme", options: ["light", "dark"])
        end
      end

      it "does not use a dropdown to contain the controls" do
        expect(page).not_to have_css("[x-ref=dropdown] [data-component=display-options-field]")
      end

      it "sets the display option value after making a selection" do
        select "dark", from: "theme"
        page.within_frame("preview-iframe") do
          expect(page).to have_css("[data-theme=dark]")
        end

        select "light", from: "theme"
        page.within_frame("preview-iframe") do
          expect(page).to have_css("[data-theme=light]")
        end
      end

      it "persists the display option value after making a selection" do
        select "dark", from: "theme"
        visit lookbook_inspect_path("standard/default")
        page.within_frame("preview-iframe") do
          expect(page).to have_css("[data-theme=dark]")
        end

        select "light", from: "theme"
        visit lookbook_inspect_path("standard/default")
        page.within_frame("preview-iframe") do
          expect(page).to have_css("[data-theme=light]")
        end
      end
    end

    context "with preview-level override" do
      before do
        Lookbook.config.preview_display_options = {
          theme: ["light", "dark"]
        }

        visit lookbook_inspect_path("standard/theme_override_scenario")
      end

      it "does not show the display control in the toolbar" do
        expect(page).not_to have_select("theme", options: ["light", "dark"])
      end
    end

    context "multiple options configured" do
      before do
        Lookbook.config.preview_display_options = {
          theme: ["light", "dark"],
          language: ["english", "german"]
        }

        visit lookbook_inspect_path("standard/default")
      end

      it "renders the display controls in the toolbar" do
        within "#app" do
          expect(page).to have_css("[data-component=display-options-editor]")
          expect(page).to have_select("theme", options: ["light", "dark"], visible: false)
          expect(page).to have_select("language", options: ["english", "german"], visible: false)
        end
      end

      it "uses a dropdown to contain the controls" do
        within "#app" do
          expect(page).to have_css("[data-component=display-options-field]", count: 2, visible: false)
        end
      end
    end
  end
end
