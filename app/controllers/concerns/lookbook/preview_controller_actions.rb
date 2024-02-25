module Lookbook
  module PreviewControllerActions
    extend ActiveSupport::Concern
    include Lookbook::PreviewActions

    included do
      prepend_view_path File.expand_path("../../../views", __dir__)

      before_action :assign_preview, only: :lookbook_render_scenario
      before_action :assign_scenario, only: :lookbook_render_scenario
      around_action :set_locale, only: :lookbook_render_scenario

      content_security_policy(false) if respond_to?(:content_security_policy)

      helper :all if include_all_helpers
    end

    def lookbook_render_scenario(scenario)
      prepend_application_view_paths
      prepend_preview_scenarios_view_path

      @render_args = scenario.render_args(params: params.permit!)

      template = @render_args[:template]
      locals = @render_args[:locals]

      opts = {}
      opts[:assigns] = @render_args[:assigns] || {}
      opts[:locals] = locals if locals.present?
      opts[:layout] = nil

      html = render_to_string(template, **opts)

      render html: html
    end

    def lookbook_render_template(template, assigns, opts = {})
      render template, assigns: assigns, **determine_layout(opts[:layout])
    end

    private

    def set_locale(&block)
      I18n.with_locale(params[:locale] || I18n.default_locale, &block)
    end

    def determine_layout(layout_override = nil)
      return {} unless defined?(Rails.root)

      layout_declaration = {}

      if !layout_override.nil?
        layout_declaration[:layout] = layout_override
      elsif default_preview_layout.present?
        layout_declaration[:layout] = default_preview_layout
      end

      prepend_application_view_paths if layout_declaration[:layout].present?

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
  end
end
