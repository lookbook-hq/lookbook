module Lookbook
  module ApplicationHelper
    def lookbook_asset_path(file, version: true)
      # In production with asset_host configured, serve from CDN
      # Assets are copied to public/assets/lookbook-assets/ during precompilation
      if Rails.env.production? &&
         Rails.application.config.action_controller.respond_to?(:asset_host) &&
         Rails.application.config.action_controller.asset_host.present?

        asset_host = Rails.application.config.action_controller.asset_host
        file_path = file.to_s.sub(%r{^/}, "")

        # Build CDN URL: asset_host already includes release path
        # e.g., https://cdn.example.com/eureka/{release}/assets/lookbook-assets/css/lookbook.css
        "#{asset_host}/assets/lookbook-assets/#{file_path}#{version ? "?v=#{Lookbook::VERSION}" : ""}"
      else
        # Development: use middleware path
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
