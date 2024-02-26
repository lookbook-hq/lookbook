module Lookbook
  class InspectorController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_preview
    before_action :assign_target
    before_action :prerender_target

    def show
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
        CodeIndenter.call(html)
      end
    end

    def render_target_in_layout(target)
      controller = preview_controller
      controller.request = scenario_render_request(target.scenarios.first)
      controller.response = ActionDispatch::Response.new

      controller.process(:lookbook_render_template,
        Inspector.preview_template,
        {target: target},
        layout: target.preview.layout)
    end

    def scenario_render_request(scenario)
      render_request = ActionDispatch::Request.new(request.env)
      render_request.path_parameters = {
        controller: Lookbook.config.preview_controller,
        action: :lookbook_render_scenario,
        preview: scenario.preview.to_param,
        scenario: scenario.to_param
      }
      render_request
    end

    def preview_controller
      Previews.preview_controller.new
    end
  end
end
