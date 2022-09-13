module Lookbook
  module PreviewController
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

      with_optional_annotations do
        render html: render_to_string(template, **opts)
      end
    end

    def render_in_layout_to_string(template, locals, opts = {})
      append_view_path Lookbook::Engine.root.join("app/views")
      html = render_to_string(template, locals: locals, **determine_layout(opts[:layout]))
      if opts[:append_html].present?
        html += opts[:append_html]
      end
      render html: html
    end

    def with_optional_annotations
      if Lookbook.config.disable_action_view_annotations
        original_value = ActionView::Base.annotate_rendered_view_with_filenames
        ActionView::Base.annotate_rendered_view_with_filenames = false

        res = yield

        ActionView::Base.annotate_rendered_view_with_filenames = original_value

        res
      else
        yield
      end
    end
  end
end
