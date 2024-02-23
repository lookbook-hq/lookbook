module Lookbook
  class PreviewsController < ApplicationController
    include Lookbook::PreviewActions

    layout false

    before_action :assign_preview_and_scenario, only: :scenario

    def scenario
      render html: render_scenario_to_string(layout: true)
    end
  end
end
