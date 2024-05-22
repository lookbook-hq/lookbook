module Lookbook
  class PreviewsController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_preview
    before_action :assign_target, only: %i[inspect embed preview]
    before_action :assign_display_options, only: %i[inspect embed preview]
    before_action :prerender_target, only: %i[inspect embed preview]
    after_action :persist_display_options, only: %i[inspect embed preview]
    skip_before_action :assign_preview, only: [:index]

    def index
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json do
          render json: Previews.map(&:to_h)
        end
      end
    end

    def inspect
      @preview_panels = Inspector.preview_panels(**panel_context)
      @drawer_panels = Inspector.drawer_panels(**panel_context)
      @preview_html = render_target_in_layout(@target)
    end

    def embed
      embed_params = params[:_embed] || {}
      target_names = Array(embed_params[:targets]).map(&:to_sym)

      @targets = @preview.inspector_targets.select { _1.name.to_sym.in?(target_names) }
      @panels = Inspector.embed_panels(embed_params[:panels], **panel_context)
      @actions = embed_params.fetch(:actions, [])
      @preview_html = render_target_in_layout(@target, embed: true)

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
        CodeBeautifier.call(WhitespaceStripper.call(html))
      end
    end

    def render_target_in_layout(target, embed: false)
      controller = preview_controller
      controller.request = scenario_render_request(target.scenarios.first)
      controller.response = ActionDispatch::Response.new

      append_html = if embed || params[:_lookbook_embed] == "true"
        render_to_string("lookbook/application/_iframe_scripts", layout: nil)
      end

      controller.process(:lookbook_render_template,
        target.preview_template,
        {
          preview: target.preview,
          target: target,
          display_options: @display_options
        },
        layout: target.preview.layout,
        append_html: append_html)
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

    def panel_context
      {
        preview: @preview,
        target: @target,
        request: request
      }
    end
  end
end
