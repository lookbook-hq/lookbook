module Lookbook
  class InspectorController < ApplicationController
    include Lookbook::AssignsPreviewsConcern

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
