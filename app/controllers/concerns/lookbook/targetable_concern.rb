module Lookbook
  module TargetableConcern
    extend ActiveSupport::Concern

    included do
      before_action :lookup_entities, only: [:show]
      before_action :set_title
      before_action :set_display_options
      before_action :set_params
    end

    def set_title
      @title = @target.present? ? [@target&.label, @preview&.label].compact.join(" :: ") : "Not found"
    end

    def lookup_entities
      @target = Lookbook.previews.find_example_by_path(params[:path])
      if @target.present?
        @preview = @target.preview
        if params[:path] == @preview&.path
          redirect_to lookbook_inspect_path("#{params[:path]}/#{@preview.default_example.name}", params.permit!)
        end
      else
        @preview = Lookbook.previews.find_by_path(params[:path])
        if @preview.present?
          default_example = @preview.default_example
          redirect_to lookbook_inspect_path(default_example.path, params.permit!) if default_example
        else
          @preview = Lookbook.previews.find_by_path(path_segments.slice(0, path_segments.size - 1).join("/"))
        end
      end
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
              cookies["lookbook-display-#{name}"] = value.is_a?(Array) ? value[1] : value
            end
          end
        end

        @dynamic_display_options.each do |name, opts|
          choices = opts.is_a?(Hash) ? opts[:choices].to_a : opts
          value = choices.first.is_a?(Array) ? choices.first[1] : choices.first
          @static_display_options[name] ||= cookies.fetch("lookbook-display-#{name}", value)
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
        preview_controller.params[:lookbook] = {
          display: @static_display_options,
          data: Lookbook.data
        }
      end

      preview_controller.params.permit!
    end

    def inspector_data
      return @inspector_data if @inspector_data.present?

      rendered_examples = @target.examples.map do |example|
        output = preview_controller.process(:render_example_to_string, @preview, example.name)
        RenderedExample.new(example, output, preview_controller.params)
      end

      @inspector_data ||= Lookbook::Store.new({
        context: Store.new({params: @params, path: params[:path]}),
        preview: @preview,
        examples: rendered_examples,
        target: @target,
        data: Lookbook.data,
        app: Lookbook
      })
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

    def path_segments
      params[:path].split("/")
    end
  end
end
