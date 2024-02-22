module Lookbook
  module PreviewControllerActions
    extend ActiveSupport::Concern
    include Lookbook::PreviewActions

    included do
      prepend_view_path File.expand_path("../../../views", __dir__)

      before_action :assign_preview_and_scenario, only: :lookbook_render_scenario
      around_action :set_locale, only: :lookbook_render_scenario

      content_security_policy(false) if respond_to?(:content_security_policy)

      helper :all if include_all_helpers
    end

    def lookbook_render_scenario(overrides = {})
      prepend_application_view_paths
      prepend_preview_scenarios_view_path

      @render_args = @scenario.render_args(params: params.permit!)

      template = @render_args[:template]
      locals = @render_args[:locals]
      layout = (overrides[:layout] == false) ? false : determine_layout(@render_args[:layout], prepend_views: false)[:layout]

      opts = {}
      opts[:assigns] = @render_args[:assigns] || {}
      opts[:locals] = locals if locals.present?
      opts[:layout] = layout if layout.present? || layout == false

      rendered = render_to_string(template, **opts)

      render html: rendered
    end

    private

    def set_locale(&block)
      I18n.with_locale(params[:locale] || I18n.default_locale, &block)
    end

    def determine_layout(layout_override = nil, prepend_views: true)
      return {} unless defined?(Rails.root)

      layout_declaration = {}

      if !layout_override.nil?
        layout_declaration[:layout] = layout_override
      elsif default_preview_layout.present?
        layout_declaration[:layout] = default_preview_layout
      end

      prepend_application_view_paths if layout_declaration[:layout].present? && prepend_views

      layout_declaration
    end

    def default_preview_layout
      Lookbook.config.preview_layout
    end

    def prepend_application_view_paths
      prepend_view_path Rails.root.join("app/views") if defined?(Rails.root)
    end

    def prepend_preview_scenarios_view_path
      prepend_view_path(Previews.preview_paths)
    end

    alias_method :prepend_preview_examples_view_path, :prepend_preview_scenarios_view_path
  end
end
