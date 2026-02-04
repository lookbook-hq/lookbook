module Lookbook
  class ScenariosController < Lookbook::ApplicationController
    include SpecScoped

    def show
      @scenarios = @spec.scenarios
      @scenario = @spec.find { _1.to_param == params[:scenario] }

      raise NotFoundError, "Scenario not found" unless @scenario
    end
  end
end
