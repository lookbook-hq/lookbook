module Lookbook
  class PreviewsController < ApplicationController
    layout "lookbook/inspector"

    def self.controller_path
      "lookbook/previews"
    end

    before_action :lookup_entities, only: [:preview, :show]
    before_action :set_title
    before_action :set_params

    def preview
      if @example
        begin
          opts = {layout: @preview.layout}
          if params[:lookbook_embed] == "true"
            opts[:append_html] = "<script src=\"/lookbook-assets/js/embed.js?v=#{Lookbook.version}\"></script>".html_safe
          end
          preview_html = preview_controller.process(:render_in_layout_to_string, "lookbook/preview", inspector_data, **opts)
          render html: preview_html
        rescue => exception
          render_in_layout "lookbook/error",
            layout: "lookbook/standalone",
            error: prettify_error(exception)
        end
      else
        show_404 layout: "lookbook/standalone"
      end
    end

    def show
      if @example
        begin
          @main_panels = main_panels
          @drawer_panels = drawer_panels
        rescue => exception
          render_in_layout "lookbook/error", layout: "lookbook/inspector", error: prettify_error(exception)
        end
      else
        show_404
      end
    end

    def show_legacy
      Lookbook.logger.warn("Legacy URL path detected. These paths are deprecated and will be removed in a future version")
      redirect_to lookbook_inspect_path params[:path]
    end

    # Namespaced preview helpers

    def lookbook_display(key, fallback = nil)
      params.dig(:lookbook, :display, key.to_sym) || fallback
    end

    def lookbook_data(key, fallback = nil)
      Lookbook.data.get(key, fallback)
    end

    private

    def lookup_entities
      @example = Lookbook.previews.find_example(params[:path])
      if @example.present?
        @preview = @example.preview
        if params[:path] == @preview&.lookup_path
          redirect_to lookbook_inspect_path "#{params[:path]}/#{@preview.default_example.name}"
        end
      else
        @preview = Lookbook.previews.find(params[:path])
        if @preview.present?
          first_example = @preview.examples.first
          redirect_to lookbook_inspect_path(first_example.lookup_path) if first_example
        else
          @preview = Lookbook.previews.find(path_segments.slice(0, path_segments.size - 1).join("/"))
        end
      end
    end

    def show_404(layout: nil)
      locals = if @preview
        {
          message: "Example not found",
          description: "The '#{@preview.label}' preview does not have an example named '#{path_segments.last}'."
        }
      else
        {
          message: "Not found",
          description: "Looked for '#{params[:path]}'.<br>The preview may have been renamed or deleted."
        }
      end
      render_in_layout "lookbook/404", layout: layout, **locals
    end

    def target_examples
      @example.type == :group ? @example.examples : [@example]
    end

    def set_title
      @title = @example.present? ? [@example&.label, @preview&.label].compact.join(" :: ") : "Not found"
    end

    def set_params
      if @example
        # cast known params to type
        @example.params.each do |param|
          if preview_controller.params.key?(param[:name])
            preview_controller.params[param[:name]] = Lookbook::Params.cast(preview_controller.params[param[:name]], param[:type])
          end
        end
        # set display and data params
        preview_controller.params.merge!({
          lookbook: {
            display: @example.display_params,
            data: Lookbook.data
          }
        })
      end
    end

    def preview_params
      preview_controller.params.permit!
      preview_controller.params.to_h.select do |key, value|
        !!@example.params.find { |param| param[:name] == key }
      end
    end

    def inspector_data
      return @inspector_data if @inspector_data.present?

      context_data = {
        preview_params: preview_params,
        path: params[:path],
      }

      example = @example
      preview = @preview
      preview.define_singleton_method(:params, proc {
        example.params
      })

      examples = target_examples.map do |example|
        render_args = @preview.render_args(example.name, params: preview_controller.params)
        has_template = render_args[:template] != "view_components/preview"
        output = preview_controller.process(:render_example_to_string, @preview, example.name)
        source = has_template ? example.template_source(render_args[:template]) : example.method_source
        source_lang = has_template ? example.template_lang(render_args[:template]) : example.lang
        
        example.define_singleton_method(:output, proc { output })
        example.define_singleton_method(:source, proc { source })
        example.define_singleton_method(:source_lang, proc { source_lang })
        example
      end

      @inspector_data ||= Lookbook::Store.new({
        context: context_data,
        preview: preview,
        examples: examples,
        components: preview.components,
        data: Lookbook.data,
        app: Lookbook
      })
    end

    def panels
      return @panels if @panels.present?
      @panels = []
      Lookbook.config.inspector_panels.each do |name, config|
        config_with_defaults = Lookbook.config.inspector_panel_defaults.merge(config)

        callable_data = {
          name: name.to_s,
          index_position: (@panels.select { |p| p.pane == config.pane }.size + 1),
          **inspector_data
        }

        resolved_config = config_with_defaults.transform_values do |value|
          value.class == Proc ? value.call(Lookbook::Store.new(callable_data)) : value
        end
        resolved_config[:name] = name.to_s
        
        @panels << Lookbook::Store.new(resolved_config, deep: false)
      end

      @panels = @panels.select(&:show).sort_by { |p| [p.position, p.label] }
    end
   
    def main_panels
      panels.select { |panel| panel.pane == :main }
    end

    def drawer_panels
      panels.select { |panel| panel.pane == :drawer }
    end

    def preview_controller
      return @preview_controller if @preview_controller
      controller = Lookbook::Engine.preview_controller.new
      controller.request = request
      controller.response = response
      @preview_controller ||= controller
    end

    def prettify_error(exception)
      error_params = if exception.is_a?(ViewComponent::PreviewTemplateError)
        {
          file_path: @preview&.full_path,
          line_number: 0,
          source_code: @example&.source
        }
      elsif exception.is_a?(ActionView::Template::Error) & exception.message.include?("implements a reserved method")
        message_parts = exception.message.split("\n").first.split
        component_class = message_parts.first.constantize
        naughty_method = message_parts.last.delete("#").delete("`").delete(".")
        method = component_class.instance_method(naughty_method.to_sym)
        if method
          {
            file_path: method.source_location.first,
            line_number: method.source_location[1]
          }
        end
      end
      Lookbook::Error.new(exception, **(error_params || {}))
    end

    def path_segments
      params[:path].split("/")
    end
  end
end
