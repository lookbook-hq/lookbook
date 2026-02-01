module Lookbook
  module AssetHelper
    def lookbook_scripts = [lookbook_asset_path("ui.js")]

    def lookbook_stylesheets = [lookbook_asset_path("ui.css")]

    def lookbook_asset_path(asset)
      "/lookbook-assets#{"-dev" if ENV["LOOKBOOK_ENV"] === "development"}/#{asset}"
    end
  end
end
