module Lookbook
  class PreviewsController < Lookbook::ApplicationController
    include WithSpecs
    include WithScenarios
    include WithDisplayOptions
    include ScenarioHelper

    before_action :assign_spec, only: :show
    before_action :assign_scenario, only: :show
    before_action :assign_display_options, only: :show
    before_action :assign_params, only: :show

    layout false

    before_action :permit_framing, only: [:show]

    def show
      scenarios = flatten_and_render(@scenario)
      @preview_html = if Lookbook.config.preview_single_pass_rendering && !scenarios.many?
        scenarios.first.output
      else
        preview_controller.process(
          :render_in_layout_to_string,
          "lookbook/previews/group",
          Store.new({
            context: Store.new({params: @params, path: params[:path]}),
            spec: @spec,
            scenarios: scenarios
          }),
          layout: @spec.layout,
          append_html: preview_assets
        )
      end
    end

    protected

    def preview_assets
      render_to_string("lookbook/previews/_assets", layout: nil)
    end

    def scenario_json(scenario)
      {
        name: scenario.name,
        inspect_path: scenario.url_path,
        preview_path: scenario.preview_path
      }
    end

    def permit_framing
      headers["X-Frame-Options"] = Lookbook.config.preview_embeds.policy
      headers["X-Frame-Options"] = "SAMEORIGIN" if headers["X-Frame-Options"]&.upcase == "DENY"
    end
  end
end
