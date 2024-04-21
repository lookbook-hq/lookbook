module Lookbook
  module PageControllerActions
    extend ActiveSupport::Concern
    include Lookbook::PageActions

    included do
      layout Lookbook.config.page_layout
      helper Lookbook::PageHelper

      prepend_view_path Engine.root.join("app/views")

      before_action :assign_page, only: :lookbook_render_page
      around_action :set_locale, only: :lookbook_render_page

      content_security_policy(false) if respond_to?(:content_security_policy)
    end

    def lookbook_render_page
      prepend_application_view_paths

      @config = Lookbook.config
      @pages = Pages.all
      @previews = Previews.all

      @page_content = render_to_string(
        inline: @page.content,
        layout: false,
        locals: {
          config: @config,
          previews: @previews,
          pages: @pages,
          page: @page,
          previous_page: @page.previous,
          next_page: @page.next
        }
      )

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
