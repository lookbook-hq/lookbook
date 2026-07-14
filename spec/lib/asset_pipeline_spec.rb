require "rails_helper"

RSpec.describe "Asset Pipeline Integration" do
  describe "lookbook_asset_path helper" do
    let(:helper) { Class.new { include Lookbook::ApplicationHelper }.new }
    let(:asset_host_config) { Rails.application.config.action_controller }

    context "when no asset_host is configured" do
      before do
        allow(asset_host_config).to receive(:asset_host).and_return(nil)
      end

      it "returns the middleware path" do
        result = helper.lookbook_asset_path("/css/lookbook.css")
        expect(result).to match(%r{/lookbook-assets/css/lookbook\.css\?v=})
      end

      it "returns a path without a version query string when version: false" do
        result = helper.lookbook_asset_path("/css/lookbook.css", version: false)
        expect(result).to eq("/lookbook-assets/css/lookbook.css")
      end
    end

    context "when an asset_host is configured" do
      before do
        allow(asset_host_config).to receive(:asset_host)
          .and_return("https://cdn.example.com/eureka/release-123")
      end

      it "builds a CDN URL under assets/lookbook-assets" do
        result = helper.lookbook_asset_path("/css/lookbook.css")
        expect(result).to eq("https://cdn.example.com/eureka/release-123/assets/lookbook-assets/css/lookbook.css?v=#{Lookbook::VERSION}")
      end

      it "strips a leading slash from the file path" do
        result = helper.lookbook_asset_path("/js/lookbook.js")
        expect(result).to eq("https://cdn.example.com/eureka/release-123/assets/lookbook-assets/js/lookbook.js?v=#{Lookbook::VERSION}")
      end

      it "omits the version query string when version: false" do
        result = helper.lookbook_asset_path("/css/lookbook.css", version: false)
        expect(result).to eq("https://cdn.example.com/eureka/release-123/assets/lookbook-assets/css/lookbook.css")
      end
    end
  end
end
