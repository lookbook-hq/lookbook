module Lookbook
  module ApplicationHelper
    def lookbook_asset_path(file, version: true)
      parts = [Rails.application.config.relative_url_root, lookbook_asset_dir, file].compact
      path = File.join(*parts)
      "/" + (version ? "#{path}?v=#{Lookbook::VERSION}" : path)
    end

    def lookbook_asset_dir
      Lookbook.env.development? ? "lookbook-dev" : "lookbook-assets"
    end
  end
end
