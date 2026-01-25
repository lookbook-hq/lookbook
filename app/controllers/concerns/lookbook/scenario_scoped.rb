module Lookbook
  module ScenarioScoped
    extend ActiveSupport::Concern
    include SpecScoped

    included do
      before_action :assign_scenarios
      before_action :assign_scenario

      protected def assign_scenarios
        @scenarios = @spec.scenarios
      end

      protected def assign_scenario
        if params[:scenario]
          @scenario = @spec.find { _1.to_param == params[:scenario] }
          raise NotFoundError, "Scenario not found" unless @scenario
        end
      end
    end
  end
end
