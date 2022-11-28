module Lookbook
  class EmbedsController < ApplicationController
    include TargetableConcern
    include WithPreviewControllerConcern

    layout "lookbook/skeleton"

    def self.controller_path
      "lookbook/embeds"
    end

    def lookup
      props = Store.new(params[:props] ? JsonParser.call(params[:props]) : {})
      if props.preview.present?
        preview = Engine.previews.find_by_preview_class(props.preview)
        if preview.present?
          example = props.example ? preview.example(props.example) : preview.default_example
          if example.present?
            option_names = ["drawer", "actions", "panels", "display_option_controls"]
            array_type_options = ["panels", "actions"]
            param_prefix = "param_"

            options = {}
            embed_params = {}

            p props

            props.each do |key, value|
              key = key.to_s.strip.tr("-", "_")
              value.strip!

              if option_names.include?(key)
                value = if array_type_options.include?(key)
                  value.split(",").map(&:strip)
                elsif value == "false"
                  false
                elsif value == "true"
                  true
                else
                  value
                end
                options[key] = value
              elsif key.start_with?(param_prefix)
                embed_params[key.gsub(param_prefix, "")] = value
              end
            end

            embed_params[:_options] = SearchParamEncoder.call(options)
            embed_params.symbolize_keys!

            return redirect_to lookbook_embed_url(example.path, embed_params)
          end
        end
      end

      show_404 layout: "lookbook/skeleton"
    end

    def show
      show_404 unless @target

      @options = SearchParamParser.call(req_params[:_options])
      inspector_data
    end

    protected

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

    def req_params
      request.query_parameters
    end
  end
end
