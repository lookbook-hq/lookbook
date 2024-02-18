module Lookbook
  class ApplicationController < ActionController::Base
    before_action :assign_template_vars

    protected

    def assign_template_vars
      @config = Lookbook.config
      @previews = Previews.all
    end

    def assign_preview_and_scenario
      assign_preview
      assign_scenario
    end

    def assign_scenario
      @scenario = @preview.scenarios.find { _1.url_param == params[:scenario] }
      raise ActionController::RoutingError, "Could not find scenario '#{params[:scenario]}' for preview '#{params[:preview]}'" unless @scenario
    end

    def assign_preview
      @preview = Previews.find { _1.url_param == params[:preview] }
      raise ActionController::RoutingError, "Could not find preview '#{params[:preview]}'" unless @preview
    end
  end
end
