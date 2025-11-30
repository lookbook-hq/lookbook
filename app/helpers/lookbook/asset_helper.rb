module Lookbook
  module AssetHelper
    def lookbook_asset_path(asset)
      "/lookbook-assets#{"-dev" if ENV["LOOKBOOK_ENV"] === "development"}/#{asset}"
    end

    def lookbook_scripts
      [
        lookbook_asset_path("ui.js")
      ]
    end

    def lookbook_stylesheets
      [
        lookbook_asset_path("ui.css")
      ]
    end
  end
end
