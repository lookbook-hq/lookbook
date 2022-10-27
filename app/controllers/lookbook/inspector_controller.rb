module Lookbook
  class InspectorController < ApplicationController
    layout "lookbook/inspector"

    helper Lookbook::PreviewHelper

    def self.controller_path
      "lookbook/inspector"
    end

    before_action :lookup_entities, only: [:preview, :show]
    before_action :set_title
    before_action :set_display_options
    before_action :set_params

    def preview
      if @target
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
      if @target
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

    private

    def lookup_entities
      @target = Lookbook.previews.find_example(params[:path])
      if @target.present?
        @preview = @target.preview
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
      @target.type == :group ? @target.examples : [@target]
    end

    def set_title
      @title = @target.present? ? [@target&.label, @preview&.label].compact.join(" :: ") : "Not found"
    end

    def set_display_options
      @dynamic_display_options = []
      @static_display_options = []

      if @target.present?
        opts = @target.display_options
        @dynamic_display_options = opts.select { _2.is_a?(Array) || _2.is_a?(Hash) }
        @static_display_options = opts.except(*@dynamic_display_options.keys)

        if params[:_display]
          display_params = SearchParamParser.call(params[:_display])
          display_params.each do |name, value|
            if @dynamic_display_options.key?(name)
              cookies["lookbook-display-#{name}"] = value
            end
          end
        end

        @dynamic_display_options.each do |name, opts|
          choices = opts.is_a?(Hash) ? opts[:choices].to_a : opts
          @static_display_options[name] ||= cookies.fetch("lookbook-display-#{name}", choices.first)
        end

        unless params[:_display]
          display_params = @dynamic_display_options.map do |name, opts|
            [name, @static_display_options[name]]
          end.to_h
          request.query_parameters[:_display] = SearchParamBuilder.call(display_params)
        end
      end
    end

    def set_params
      @params = []

      if @target
        @params = @target.tags("param").map do |param_tag|
          Param.from_tag(
            param_tag,
            value: preview_controller.params[param_tag.name]
          )
        end

        # cast known param values to correct type
        @params.each do |param|
          if preview_controller.params.key?(param.name)
            preview_controller.params[param.name] = param.cast_value
          end
        end

        # set display and data params for use in preview layouts
        preview_controller.params.merge!({
          lookbook: {
            display: @static_display_options,
            data: Lookbook.data
          }
        })
      end
    end

    def preview_params
      preview_controller.params.permit!
      preview_controller.params.to_h.select do |key, value|
        !!@params.find { |param_tag| param_tag.name == key.to_s }
      end
    end

    def inspector_data
      return @inspector_data if @inspector_data.present?

      context_data = {
        preview_params: preview_params,
        path: params[:path]
      }

      preview = @preview
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

      target = @target.type == :group ? @target : examples.find { |e| e.lookup_path == @target.lookup_path }

      preview_params = @params
      preview.define_singleton_method(:params, proc { preview_params })

      @inspector_data ||= Lookbook::Store.new({
        context: context_data,
        preview: preview,
        examples: examples,
        example: examples.first,
        target: target,
        data: Lookbook.data,
        app: Lookbook
      })
    end

    def main_panels
      Engine.panels.in_group(:main).map do |config|
        PanelStore.resolve_config(config, inspector_data)
      end
    end

    def drawer_panels
      Engine.panels.in_group(:drawer).map do |config|
        PanelStore.resolve_config(config, inspector_data)
      end
    end

    def preview_controller
      return @preview_controller if @preview_controller
      controller = Lookbook::Engine.preview_controller.new
      controller.request = request
      controller.response = response
      @preview_controller ||= controller
    end

    def prettify_error(exception)
      error_params = {}
      if exception.is_a?(ViewComponent::PreviewTemplateError)
        error_params = {
          file_path: @preview&.full_path,
          line_number: 0,
          source_code: @target&.source
        }
      end
      Lookbook::Error.new(exception, **error_params)
    end

    def path_segments
      params[:path].split("/")
    end
  end
end
