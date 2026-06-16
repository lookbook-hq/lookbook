require "rails_helper"

RSpec.describe "Asset Pipeline Integration" do
  describe "Sprockets asset paths" do
    it "includes lookbook assets in the asset pipeline paths" do
      skip "Dummy app doesn't have Sprockets configured" unless Rails.application.config.respond_to?(:assets)

      lookbook_assets_path = Lookbook::Engine.root.join("public", "lookbook-assets").to_s
      expect(Rails.application.config.assets.paths).to include(lookbook_assets_path)
    end

    it "registers lookbook assets for precompilation" do
      skip "Dummy app doesn't have Sprockets configured" unless Rails.application.config.respond_to?(:assets)

      precompile_list = Rails.application.config.assets.precompile

      expect(precompile_list).to include("css/lookbook.css")
      expect(precompile_list).to include("js/lookbook.js")
      expect(precompile_list).to include("js/index.js")
      expect(precompile_list).to include("js/iframe.js")
    end
  end

  describe "lookbook_asset_path helper" do
    let(:helper) { Class.new { include Lookbook::ApplicationHelper }.new }

    context "when Sprockets is available" do
      before do
        # Ensure Sprockets constant is defined
        stub_const("Sprockets", Module.new) unless defined?(Sprockets)
      end

      it "uses Rails asset_path for asset resolution" do
        # Mock ActionController::Base.helpers.asset_path
        allow(ActionController::Base.helpers).to receive(:asset_path)
          .with("css/lookbook.css")
          .and_return("/assets/css/lookbook-abc123.css")

        result = helper.lookbook_asset_path("/css/lookbook.css")
        expect(result).to eq("/assets/css/lookbook-abc123.css")
      end

      it "strips leading slash from file path" do
        allow(ActionController::Base.helpers).to receive(:asset_path)
          .with("js/lookbook.js")
          .and_return("/assets/js/lookbook-def456.js")

        result = helper.lookbook_asset_path("/js/lookbook.js")
        expect(result).to eq("/assets/js/lookbook-def456.js")
      end

      it "falls back to middleware path if asset not found" do
        allow(ActionController::Base.helpers).to receive(:asset_path)
          .and_raise(StandardError.new("Asset not found"))

        result = helper.lookbook_asset_path("/css/missing.css")
        expect(result).to match(%r{/lookbook-assets/css/missing\.css\?v=})
      end
    end

    context "when Propshaft is available" do
      before do
        stub_const("Propshaft", Module.new) unless defined?(Propshaft)
        hide_const("Sprockets") if defined?(Sprockets)
      end

      it "uses Rails asset_path for asset resolution" do
        allow(ActionController::Base.helpers).to receive(:asset_path)
          .with("css/lookbook.css")
          .and_return("/assets/css/lookbook-xyz789.css")

        result = helper.lookbook_asset_path("/css/lookbook.css")
        expect(result).to eq("/assets/css/lookbook-xyz789.css")
      end
    end

    context "when no asset pipeline is available" do
      before do
        hide_const("Sprockets") if defined?(Sprockets)
        hide_const("Propshaft") if defined?(Propshaft)
      end

      it "returns middleware path" do
        result = helper.lookbook_asset_path("/css/lookbook.css")
        expect(result).to match(%r{/lookbook-assets/css/lookbook\.css\?v=})
      end

      it "returns path without version when version: false" do
        result = helper.lookbook_asset_path("/css/lookbook.css", version: false)
        expect(result).to eq("/lookbook-assets/css/lookbook.css")
      end
    end

    context "with asset_host configured" do
      before do
        stub_const("Sprockets", Module.new)
        allow(Rails.application.config.action_controller).to receive(:asset_host)
          .and_return("https://cdn.example.com/assets")
      end

      it "uses CDN URL via asset_path" do
        allow(ActionController::Base.helpers).to receive(:asset_path)
          .with("css/lookbook.css")
          .and_return("https://cdn.example.com/assets/css/lookbook-abc123.css")

        result = helper.lookbook_asset_path("/css/lookbook.css")
        expect(result).to eq("https://cdn.example.com/assets/css/lookbook-abc123.css")
      end
    end
  end
end
