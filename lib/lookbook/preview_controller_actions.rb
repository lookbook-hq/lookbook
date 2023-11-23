module Lookbook
  module PreviewControllerActions
    extend ActiveSupport::Concern

    included do
      helper PreviewHelper
      send(:helper, Rails.application.routes.url_helpers) # YARD parsing workaround: https://github.com/lsegal/yard/issues/546
      prepend_view_path Engine.root.join("app/views")

      def render_scenario_to_string(preview, scenario)
        prepend_application_view_paths
        prepend_preview_examples_view_path

        @preview = preview
        @scenario_name = scenario.name
        @render_args = @preview.render_args(@scenario_name, params: params.permit!)
        template = @render_args[:template]
        locals = @render_args[:locals]
        opts = {}
        opts[:layout] = nil
        opts[:assigns] = @render_args[:assigns] || {}
        opts[:locals] = locals if locals.present?

        rendered = render_to_string(template, **opts)

        if scenario.after_render_method.present?
          render_context = Store.new({
            preview: preview,
            scenario: scenario,
            params: user_request_parameters
          })
          rendered = @preview.after_render(method: scenario.after_render_method, html: rendered, context: render_context)
        end

        with_optional_action_view_annotations do
          render html: rendered
        end
      end

      def render_in_layout_to_string(template, locals, opts = {})
        with_optional_action_view_annotations do
          html = render_to_string(template, locals: locals, **determine_layout(opts[:layout]))
          if opts[:append_html].present?
            html += opts[:append_html]
          end
          render html: html
        end
      end

      protected

      def with_optional_action_view_annotations(&block)
        disable = Lookbook.config.preview_disable_action_view_annotations
        ActionViewAnnotationsHandler.call(disable_annotations: disable, &block)
      end

      def user_request_parameters
        request.query_parameters.to_h.filter { |k, v| !k.start_with?("_") }
      end
    end
  end
end
