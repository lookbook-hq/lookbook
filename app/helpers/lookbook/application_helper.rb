module Lookbook
  module ApplicationHelper
    def lookbook_asset_path(file, version: true)
      # Use asset pipeline (Sprockets/Propshaft) when available for CDN support
      if defined?(::Sprockets) || defined?(::Propshaft)
        begin
          # Strip leading slash and use Rails asset pipeline for resolution
          # This enables digest paths and respects asset_host configuration
          asset_name = file.to_s.sub(%r{^/}, "")
          ActionController::Base.helpers.asset_path(asset_name)
        rescue => e
          # Fallback to middleware path if asset not found in pipeline
          Rails.logger.debug "Lookbook asset not found via pipeline: #{file} (#{e.class}), using middleware path"
          middleware_path(file, version)
        end
      else
        # Use middleware path when no asset pipeline is available
        middleware_path(file, version)
      end
    end

    private

    def middleware_path(file, version)
      path = "#{Engine.host_config.relative_url_root}/lookbook-assets/#{file}".gsub("//", "/")
      version ? "#{path}?v=#{Lookbook::VERSION}" : path
    end

    def lookbook_landing_path
      landing = Engine.pages.find(&:landing?) || Engine.pages.first
      if landing.present?
        lookbook_page_path landing.lookup_path
      else
        lookbook_home_path
      end
    end

    # Requests

    def request_frame
      request.headers["X-Lookbook-Frame"] || "root"
    end

    def frame_request?
      request.headers["X-Lookbook-Frame"].present?
    end
  end
end
