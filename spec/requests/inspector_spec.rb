require "rails_helper"

RSpec.describe "inspector", type: :request do
  context "main" do
    let(:panels) { Lookbook.config.preview_inspector.main_panels }

    context "panel tabs" do
      before do
        get lookbook_inspect_path("standard/default")
      end

      it "displays the expected tabs" do
        panels.each do |name|
          expect(html).to have_css("[data-tab=#{name}]")
        end
      end

      it "displays the expected panels" do
        panels.each do |name|
          expect(html).to have_css("[data-panel=#{name}]")
        end
      end
    end
  end

  context "drawer" do
    let(:panels) { Lookbook.config.preview_inspector.drawer_panels.select { |name| name != "*" } }

    context "panel tabs" do
      before do
        get lookbook_inspect_path("standard/default")
      end

      it "displays the expected tabs" do
        panels.each do |name|
          expect(html).to have_css("[data-tab=#{name}]")
        end
      end

      it "displays the expected panels" do
        panels.each do |name|
          expect(html).to have_css("[data-panel=#{name}]")
        end
      end
    end

    context "params panel" do
      before do
        get lookbook_inspect_path("params/all_params")
      end

      it "renders all expected param inputs" do
        ["text", "email", "number", "tel", "url", "date", "datetime-local"].each do |type|
          expect(html).to have_css("[data-panel=params] input[type=#{type}][name=#{type.tr("-", "_")}]")
        end

        expect(html).to have_css("[data-panel=params] select[name=select]")
        expect(html).to have_css("[data-panel=params] input[type=color][name=color]")
        expect(html).to have_css("[data-panel=params] input[type=range][name=range]")
        expect(html).to have_css("[data-panel=params] textarea[name=textarea]")
      end
    end

    context "output panel" do
      context "multi-line tags" do
        it "does not raise an exception" do
          get lookbook_inspect_path("multiline_tag/default")

          expect(response.status).not_to eq 500
        end
      end
    end
  end
end
