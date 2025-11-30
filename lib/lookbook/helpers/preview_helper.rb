module Lookbook
  # Set of helpers for preview layouts
  #
  # @api public
  module PreviewHelper
    def lookbook_display(key, fallback = nil)
      params.dig(:lookbook, :display, key.to_sym) || fallback
    end

    def lookbook_data(key, fallback = nil)
      Lookbook.data.fetch(key.to_sym, fallback)
    end

    def lookbook_preview_assets
      safe_join([
        javascript_include_tag("/lookbook-assets#{"-dev" if ENV["LOOKBOOK_ENV"] === "development"}/preview.js", type: "module", defer: true),
        stylesheet_link_tag("/lookbook-assets#{"-dev" if ENV["LOOKBOOK_ENV"] === "development"}/preview.css")
      ], "\n")
    end
  end
end
