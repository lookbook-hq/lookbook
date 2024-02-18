module Lookbook
  class InspectorController < ApplicationController
    before_action :assign_preview, only: %i[preview scenario]
    before_action :assign_scenario, only: %i[scenario]

    def index
    end

    def preview
    end

    def scenario
    end

    private

    def assign_scenario
      @scenario = @preview.scenarios.find { _1.url_param == params[:scenario] }
      # raise ActionController::RoutingError, "Could not find scenario '#{params[:scenario]}' for preview '#{params[:preview]}'" unless @scenario
    end

    def assign_preview
      @preview = Previews.find { _1.url_param == params[:preview] }
      raise ActionController::RoutingError, "Could not find preview '#{params[:preview]}'" unless @preview
    end
  end
end
