module Lookbook
  module PreviewActions
    extend ActiveSupport::Concern

    private

    def assign_preview
      @preview = Previews.all.find_by_url_param(params[:preview])
      raise ActionController::RoutingError, "Could not find preview '#{params[:preview]}'" unless @preview
    end

    def assign_target
      @target = @preview.inspectables.find_by_url_param(params[:target])
      raise ActionController::RoutingError, "Could not find target '#{params[:target]}' for preview '#{params[:preview]}'" unless @target
    end

    def assign_scenario
      @scenario = @preview.scenarios.find_by_url_param(params[:scenario])
      raise ActionController::RoutingError, "Could not find scenario '#{params[:scenario]}' for preview '#{params[:preview]}'" unless @scenario
    end
  end
end
