module Lookbook
  module WithScenarios
    extend ActiveSupport::Concern
    include WithSpecs
    include WithPreviewController

    included do
      helper_method :render_scenario
      helper_method :render_scenarios

      protected

      def assign_scenario
        scenario = @spec.scenario(params[:scenario])

        raise_not_found("Scenario not found - #{@spec.lookup_path}/#{params[:scenario]}") unless scenario

        @scenario = scenario.is_a?(ScenarioGroupEntity) ? scenario : render_scenario(scenario)
      end

      def assign_scenarios
        @scenarios = @scenario.is_a?(ScenarioGroupEntity) ? render_scenarios(@scenario.scenarios) : [@scenario]
      end

      def render_scenario(scenario)
        output = begin
          preview_controller.process(:render_scenario_to_string, @spec, scenario)
        rescue => e
          e.message
        end

        RenderedScenarioEntity.new(scenario, output, preview_controller.params)
      end

      def render_scenarios(scenarios)
        scenarios.map do |scenario|
          return scenario if scenario.is_a?(RenderedScenarioEntity)
          render_scenario(scenario)
        end
      end

      # TODO: replace this with param handing code from v3 branch
      def assign_params
        @params = []

        if @scenario
          param_tags = @scenario.tags("param").uniq(&:name)
          @params = param_tags.map do |param_tag|
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
    end
  end
end
