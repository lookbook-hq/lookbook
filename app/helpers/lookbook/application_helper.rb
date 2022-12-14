module Lookbook
  module ApplicationHelper
    def config
      Lookbook::Engine.config.lookbook
    end

    def theme
      Engine.theme
    end

    def asset_path(file, version: true)
      path = "/lookbook-assets/#{file}".gsub("//", "/")
      version ? "#{path}?v=#{Lookbook::VERSION}" : path
    end

    def feature_enabled?(name)
      Lookbook::Features.enabled?(name)
    end

    def landing_path
      landing = Engine.pages.find(&:landing?) || Engine.pages.first
      if landing.present?
        lookbook_page_path landing.lookup_path
      else
        lookbook_home_path
      end
    end

    def generate_id(*args)
      args.map { |args| args.delete_prefix("/").tr("&?=/_-", "-") }.join("-")
    end
  end
end
