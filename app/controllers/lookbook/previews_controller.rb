module Lookbook
  class PreviewsController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_preview
    before_action :assign_target, only: %i[inspect embed preview]
    before_action :prerender_target, only: %i[inspect embed preview]

    def show
      @targets = Inspector.preview_targets(@preview)
    end

    def inspect
    end

    def embed
      render layout: "lookbook/embed"
    end

    def preview
      render html: render_target_in_layout(@target)
    end

    private

    def prerender_target
      controller = preview_controller
      @target.render_scenarios do |scenario|
        controller.request = scenario_render_request(scenario)
        controller.response = ActionDispatch::Response.new
        html = controller.process(:lookbook_render_scenario, scenario)
        WhitespaceStripper.call(html)
      end
    end

    def render_target_in_layout(target)
      controller = preview_controller
      controller.request = scenario_render_request(target.scenarios.first)
      controller.response = ActionDispatch::Response.new

      controller.process(:lookbook_render_template,
        target.preview_template,
        {target: target},
        layout: target.preview.layout)
    end

    def scenario_render_request(scenario)
      render_request = ActionDispatch::Request.new(request.env)
      render_request.path_parameters = scenario_path_params(scenario)
      render_request
    end

    def preview_controller
      Previews.preview_controller.new
    end

    def scenario_path_params(scenario)
      Rails.application.routes.recognize_path(main_app.lookbook_render_scenario_path(scenario.preview, scenario))
    end
  end
end
