module Lookbook
  class PreviewsController < Lookbook::ApplicationController
    include WithSpecs
    include WithScenarios
    include WithDisplayOptions

    before_action :assign_spec, only: :show
    before_action :assign_scenario, only: :show
    before_action :assign_scenarios, only: :show
    before_action :assign_display_options, only: :show
    before_action :assign_params, only: :show

    layout false

    before_action :permit_framing, only: [:show]

    # TODO: move into specific API controller
    def index
      respond_to do |format|
        format.json do
          render(
            json: Lookbook.previews.map do |preview|
              {
                name: preview.name,
                scenarios: preview.scenarios.map { |scenario|
                  case scenario
                  when Lookbook::ScenarioEntity
                    scenario_json(scenario)
                  when Lookbook::ScenarioGroupEntity
                    {
                      name: scenario.name,
                      examples: scenario.scenarios.map { |s| scenario_json(s) }
                    }
                  end
                }
              }
            end
          )
        end
      end
    end

    def show
      @preview_html = if Lookbook.config.preview_single_pass_rendering && !@scenarios.many?
        @scenarios.first.output
      else
        preview_controller.process(
          :render_in_layout_to_string,
          "lookbook/previews/group",
          Store.new({
            context: Store.new({params: @params, path: params[:path]}),
            spec: @spec,
            scenarios: @scenarios
          }),
          layout: @spec.layout,
          append_html: (assets_for_embed if embedded?)
        )
      end
    end

    private

    def embedded?
      params[:lookbook_embed] == "true"
    end

    def assets_for_embed
      render_to_string("lookbook/previews/_assets_for_embed", layout: nil)
    end

    def scenario_json(scenario)
      {
        name: scenario.name,
        inspect_path: scenario.url_path,
        preview_path: scenario.preview_path
      }
    end

    def permit_framing
      headers["X-Frame-Options"] = Lookbook.config.preview_embeds.policy if embedded?
      headers["X-Frame-Options"] = "SAMEORIGIN" if headers["X-Frame-Options"]&.upcase == "DENY"
    end
  end
end
