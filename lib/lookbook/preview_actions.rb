module Lookbook
  module PreviewActions
    def self.included(klass)
      klass.helper Lookbook::PreviewHelper
    end

    def render_example_to_string(preview, example_name)
      prepend_application_view_paths
      prepend_preview_examples_view_path
      @preview = preview
      @example_name = example_name
      @render_args = @preview.render_args(@example_name, params: params.permit!)
      template = @render_args[:template]
      locals = @render_args[:locals]
      opts = {}
      opts[:layout] = nil
      opts[:locals] = locals if locals.present?

      with_optional_action_view_annotations do
        render html: render_to_string(template, **opts)
      end
    end

    def render_in_layout_to_string(template, locals, opts = {})
      append_view_path Lookbook::Engine.root.join("app/views")

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
  end
end
