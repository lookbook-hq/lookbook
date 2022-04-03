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
      render html: render_to_string(template, **opts)
    end

    def render_in_layout_to_string(template, locals, layout = nil)
      append_view_path Lookbook::Engine.root.join("app/views")
      render html: render_to_string(template, locals: locals, **determine_layout(layout))
    end
  end
end
