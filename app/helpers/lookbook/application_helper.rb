module Lookbook
  module ApplicationHelper
    def config
      Lookbook::Engine.config.lookbook
    end

    def feature_enabled?(name)
      Lookbook::Features.enabled?(name)
    end

    def landing_path
      landing = feature_enabled?(:pages) ? Lookbook.pages.find(&:landing) || Lookbook.pages.first : nil
      if landing.present?
        page_path(landing.lookup_path)
      else
        home_path
      end
    end

    def generate_id(*args)
      args.map { |args| args.delete_prefix("/").tr("&?=/_\-", "-") }.join("-")
    end
  end
end
