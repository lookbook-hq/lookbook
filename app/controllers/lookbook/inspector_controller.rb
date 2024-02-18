module Lookbook
  class InspectorController < ApplicationController
    before_action :assign_preview, only: :preview
    before_action :assign_preview_and_scenario, only: :scenario

    def index
    end

    def preview
    end

    def scenario
    end
  end
end
