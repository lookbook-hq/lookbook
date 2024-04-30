module Lookbook
  module AssetHelper
    def lookbook_asset_path(file, version: true)
      parts = [Rails.application.config.relative_url_root, "lookbook-assets", file].compact
      path = File.join(*parts)
      "/" + (version ? "#{path}?v=#{Lookbook::VERSION}" : path)
    end

    def lookbook_asset_tags(name = "app")
      safe_join([
        lookbook_stylesheet_tag(name),
        lookbook_stylesheet_tag("theme-light"),
        lookbook_stylesheet_tag("theme-dark"),
        lookbook_script_tag(name)
      ], "\n")
    end

    def lookbook_script_tag(name = "app")
      javascript_include_tag(lookbook_asset_path("/#{name}.js"), defer: true)
    end

    def lookbook_stylesheet_tag(name = "app")
      stylesheet_link_tag(lookbook_asset_path("/#{name}.css"))
    end
  end
end
