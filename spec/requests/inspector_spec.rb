require "rails_helper"

RSpec.describe "inspector", type: :request do
  context "main" do
    let(:panels) { Lookbook::Engine.panels.in_group(:main) }

    context "panel tabs" do
      before do
        get lookbook_inspect_path("standard/default")
      end

      it "displays the expected tabs" do
        panels.each do |opts|
          expect(html).to have_css("[data-tab=#{opts.name}]")
        end
      end

      it "displays the expected panels" do
        panels.each do |opts|
          expect(html).to have_css("[data-panel=#{opts.name}]")
        end
      end
    end
  end

  context "drawer" do
    let(:panels) { Lookbook::Engine.panels.in_group(:drawer) }

    context "panel tabs" do
      before do
        get lookbook_inspect_path("standard/default")
      end

      it "displays the expected tabs" do
        panels.each do |opts|
          expect(html).to have_css("[data-tab=#{opts.name}]")
        end
      end

      it "displays the expected panels" do
        panels.each do |opts|
          expect(html).to have_css("[data-panel=#{opts.name}]")
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
  end
end
