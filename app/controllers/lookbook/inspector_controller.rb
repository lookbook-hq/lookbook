module Lookbook
  class InspectorController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_preview, only: :preview
    before_action :assign_preview_and_scenario, only: :scenario

    def index
    end

    def preview
    end

    def scenario
      @scenario_html = CGI::escapeHTML(preview_controller.process(:lookbook_render_scenario, {layout: false}))
    end
  end
end
