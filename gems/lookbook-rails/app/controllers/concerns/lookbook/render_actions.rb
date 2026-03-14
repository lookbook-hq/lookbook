module Lookbook
  module RenderActions
    extend ActiveSupport::Concern

    included do
      prepend_view_path File.expand_path("../../../views", __dir__)

      around_action :set_locale
      before_action :prepend_view_paths

      content_security_policy(false)
    end

    protected def set_locale(&block)
      I18n.with_locale(params[:locale] || I18n.default_locale, &block)
    end

    protected def default_preview_layout
      nil
    end

    protected def render_options(opts = {})
      if default_preview_layout.present? || default_preview_layout == false
        opts[:layout] ||= default_preview_layout
      end
      opts
    end

    protected def prepend_view_paths
      prepend_application_view_paths
      prepend_collection_view_paths
    end

    protected def prepend_application_view_paths
      prepend_view_path Rails.root.join("app/views") if defined?(Rails.root)
    end

    protected def prepend_collection_view_paths
      prepend_view_path Lookbook::Rails::Collection.map(&:path)
    end
  end
end
