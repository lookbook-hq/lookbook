module Lookbook
  module PageControllerActions
    extend ActiveSupport::Concern
    include Lookbook::PageActions

    included do
      layout Lookbook.config.page_layout
      helper Lookbook::AssetHelper
      helper Lookbook::PageHelper

      prepend_view_path File.expand_path("../../../views", __dir__)

      before_action :assign_page, only: :lookbook_render_page
      around_action :set_locale, only: :lookbook_render_page

      content_security_policy(false) if respond_to?(:content_security_policy)
    end

    def lookbook_render_page
      prepend_application_view_paths

      @config = Lookbook.config

      render Lookbook.config.page_template
    end

    private

    def set_locale(&block)
      I18n.with_locale(params[:locale] || I18n.default_locale, &block)
    end

    def prepend_application_view_paths
      prepend_view_path Rails.root.join("app/views") if defined?(Rails.root)
    end
  end
end
