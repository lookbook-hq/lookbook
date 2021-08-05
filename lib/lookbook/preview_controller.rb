module Lookbook
  module PreviewController

    def render_component_to_string(preview, example_name)
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
      render_to_string template, opts
    end

  end
end