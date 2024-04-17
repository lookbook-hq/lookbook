module Lookbook
  module AssetHelper
    def lookbook_asset_path(file, version: true)
      parts = [Rails.application.config.relative_url_root, "lookbook-assets", file].compact
      path = File.join(*parts)
      "/" + (version ? "#{path}?v=#{Lookbook::VERSION}" : path)
    end

    def lookbook_asset_tags(context = "app")
      safe_join([
        lookbook_stylesheet_tag(context),
        lookbook_script_tag(context)
      ], "\n")
    end

    def lookbook_script_tag(context = "app")
      javascript_include_tag(lookbook_asset_path("/#{context}.js"), defer: true)
    end

    def lookbook_stylesheet_tag(context = "app")
      stylesheet_link_tag(lookbook_asset_path("/#{context}.css"))
    end
  end
end
