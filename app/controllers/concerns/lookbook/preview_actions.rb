module Lookbook
  module PreviewActions
    extend ActiveSupport::Concern

    private

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

    def render_scenario_to_string(layout: true)
      preview_controller.process(:lookbook_render_scenario, {layout: layout})
    end

    def preview_controller
      controller = Previews.preview_controller.new
      controller.request = preview_render_request
      controller.response = response
      controller
    end

    def preview_render_request
      preview_request = request.clone
      preview_request.path_parameters = Rails.application.routes.recognize_path(main_app.lookbook_render_preview_path)
      preview_request
    end
  end
end
