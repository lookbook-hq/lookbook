module Lookbook
  module AssetHelper
    def lookbook_manifest
      JSON.load_file("#{Lookbook::Engine.root}/public/lookbook-assets/manifest.json")
    end

    def lookbook_script_url
      "#{Engine.host_config.relative_url_root}/#{lookbook_manifest["public/lookbook-assets/scripts.js"].gsub("public/", "")}"
    end

    def lookbook_stylesheet_url
      "#{Engine.host_config.relative_url_root}/#{lookbook_manifest["public/lookbook-assets/styles.css"].gsub("public/", "")}"
    end
  end
end
