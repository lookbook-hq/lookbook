module Lookbook
  class EmbedsController < Lookbook::ApplicationController
    include ActionView::Helpers::SanitizeHelper
    include WithSpecs
    include WithScenarios

    before_action :assign_spec, only: :scenario
    before_action :assign_scenario, only: :scenario
    before_action :assign_scenarios, only: :scenario

    layout "lookbook/skeleton"

    before_action :permit_embeds

    def lookup
    end

    def scenario
    end

    protected

    def permit_embeds
      headers["X-Frame-Options"] = Lookbook.config.preview_embeds.policy
    end

    def set_params
      @params = []
      @passed_params = request.query_parameters.select { |key, value| !key.to_s.start_with?("_") }

      if @scenario
        @params = @scenario.tags("param").map do |param_tag|
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
  end
end
