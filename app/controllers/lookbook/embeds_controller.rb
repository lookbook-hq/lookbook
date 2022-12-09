module Lookbook
  class EmbedsController < ApplicationController
    include TargetableConcern
    include WithPreviewControllerConcern

    layout "lookbook/embed"

    before_action :set_options, only: [:show]
    before_action :set_example_choices, only: [:show]
    before_action :set_panels, only: [:show]
    before_action :set_actions, only: [:show]

    def self.controller_path
      "lookbook/embeds"
    end

    def lookup
      props = Store.new(params[:props] ? JsonParser.call(params[:props]) : {})
      if props.preview.present?
        preview = Engine.previews.find_by_preview_class(props.preview)
        if preview.present?
          props.examples ||= (props.example || "")
          example = preview.example(Array(props.examples).first)

          boolean_options = ["display_option_controls"]
          array_options = ["panels", "actions", "examples"]
          param_prefix = "param_"

          options = {}
          embed_params = {}

          props.each do |key, value|
            key = key.to_s.strip.tr("-", "_")
            value.strip!

            if array_options.include?(key)
              options[key] = if value == "false"
                []
              elsif value == "true"
                ["*"]
              else
                value.split(",").map(&:strip)
              end
            elsif boolean_options.include?(key)
              options[key] = (value == "false") ? false : !!value
            elsif key.start_with?(param_prefix)
              embed_params[key.gsub(param_prefix, "")] = value
            end
          end

          embed_params[:_options] = SearchParamEncoder.call(options)
          embed_params.symbolize_keys!

          return redirect_to lookbook_embed_url(example ? example.path : preview.path, embed_params)
        end
      end

      show_404 layout: "lookbook/skeleton"
    end

    def show
      @embed = true

      unless @target
        @target = @example_choices.first || @preview.default_example
        if @target
          redirect_to lookbook_embed_path(@target.path, req_params)
        else
          show_404(layout: "lookbook/skeleton") unless @target
        end
      end
    end

    protected

    def lookup_entities
      @target = Lookbook.previews.find_example_by_path(params[:path])
      @preview = @target.present? ? @target.preview : Lookbook.previews.find_by_path(params[:path])
    end

    def set_params
      @params = []
      @passed_params = req_params.select { |key, value| !key.to_s.start_with?("_") }

      if @target
        @params = @target.tags("param").map do |param_tag|
          Param.from_tag(
            param_tag,
            value: @passed_params[param_tag.name.to_sym]
          )
        end

        # cast known param values to correct type
        @params.each do |param|
          if @passed_params.key?(param.name.to_sym)
            @passed_params[param.name.to_sym] = param.cast_value
          end
        end
      end
    end

    def set_options
      return @options if @options

      options = SearchParamParser.call(req_params[:_options])
      default_options = Lookbook.config.preview_embed.to_h
      @options ||= default_options.merge(options)
    end

    def set_example_choices
      return @example_choices ||= [] unless @preview

      named_choices = @options.fetch(:examples, [])
      @example_choices = ListResolver.call(named_choices, @preview.examples.map(&:name)) do |name|
        @preview.example(name)
      end
    end

    def set_actions
      @actions ||= ListResolver.call(@options.fetch(:actions, []), Embed::Component::ACTIONS)
    end

    def set_panels
      return @panels if @panels

      panels = @options.fetch(:panels, [])
      all_panels = Engine.panels.names.map(&:to_s) - ["preview"]
      @panels = ListResolver.call(panels, all_panels) do |name|
        config = Engine.panels.get_panel(name.to_sym)
        PanelStore.resolve_config(config, inspector_data) if config
      end
    end

    def req_params
      request.query_parameters
    end
  end
end
