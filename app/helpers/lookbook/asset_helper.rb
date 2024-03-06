module Lookbook
  module AssetHelper
    def lookbook_asset_path(file, version: true)
      parts = [Rails.application.config.relative_url_root, lookbook_asset_dir, file].compact
      path = File.join(*parts)
      "/" + (version ? "#{path}?v=#{Lookbook::VERSION}" : path)
    end

    def lookbook_asset_dir
      Lookbook.env.development? ? "lookbook-dev" : "lookbook-assets"
    end

    def lookbook_asset_tags(context = "app")
      safe_join([
        stylesheet_link_tag(lookbook_asset_path("/#{context}.css")),
        javascript_include_tag(lookbook_asset_path("/#{context}.js"), defer: true)
      ], "\n")
    end
  end
end
