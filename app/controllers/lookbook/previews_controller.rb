module Lookbook
  class PreviewsController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_preview_and_scenario, only: :scenario

    def scenario
      render html: preview_controller.process(:lookbook_render_scenario)
      # render html: @preview_controller.process(:lookbook_render_scenario, {layout: true})
    end

  end
end
