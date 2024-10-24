module Lookbook
  module PreviewControllerActions
    extend ActiveSupport::Concern
    include Lookbook::PreviewActions

    included do
      prepend_view_path Engine.root.join("app/views")

      before_action :assign_preview, only: :lookbook_render_scenario
      before_action :assign_scenario, only: :lookbook_render_scenario
      around_action :lookbook_set_locale, only: :lookbook_render_scenario

      content_security_policy(false) if respond_to?(:content_security_policy)

      helper :all if include_all_helpers
      helper Lookbook::AssetHelper
      helper Lookbook::PreviewHelper
    end

    def lookbook_render_scenario(scenario = @scenario)
      prepend_application_view_paths
      prepend_preview_scenarios_view_path

      @render_args = scenario.render_args(request_params: request.query_parameters)

      template = @render_args[:template]
      locals = @render_args[:locals]

      opts = {}
      opts[:assigns] = @render_args[:assigns] || {}
      opts[:locals] = locals if locals.present?
      opts[:layout] = nil

      with_action_view_settings do
        html = render_to_string(template, **opts)
        render html: html
      end
    end

    def lookbook_render_template(template, assigns, opts = {})
      prepend_application_view_paths
      prepend_preview_scenarios_view_path

      with_action_view_settings do
        html = render_to_string(template, assigns: assigns, **lookbook_determine_layout(opts[:layout]))
        html += opts[:append_html]
        render html: html
      end
    end

    private

    def lookbook_set_locale(&block)
      I18n.with_locale(params[:locale] || I18n.default_locale, &block)
    end

    def lookbook_determine_layout(layout_override = nil)
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

    def with_action_view_settings(&block)
      ActionViewConfigHandler.call(
        disable_annotations: Lookbook.config.preview_disable_action_view_annotations,
        &block
      )
    end
  end
end
