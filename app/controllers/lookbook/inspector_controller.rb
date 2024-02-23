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
      @rendered_html = render_scenario_to_string(layout: false)
    end
  end
end
