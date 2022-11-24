module Lookbook
  class EmbedsController < ApplicationController
    include TargetableConcern
    include WithPreviewControllerConcern

    layout "lookbook/skeleton"

    def show
      show_404 unless @target

      @options = SearchParamParser.call(req_params[:_options])
      inspector_data
    end

    def self.controller_path
      "lookbook/embeds"
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
