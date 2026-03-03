module Lookbook
  module WithScenario
    extend ActiveSupport::Concern

    included do
      before_action :assign_scenario
    end

    private def assign_scenario
      if params[:scenario]
        @scenario = Collection.scenarios.find { _1.to_param == params[:scenario] }

        raise NotFoundError, "Scenario not found" unless @scenario
      end
    end
  end
end
