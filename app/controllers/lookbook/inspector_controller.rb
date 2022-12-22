module Lookbook
  class InspectorController < ApplicationController
    include TargetableConcern
    include WithPanelsConcern
    include WithPreviewControllerConcern

    layout "lookbook/application"

    def self.controller_path
      "lookbook/inspector"
    end

    def show
      if @target
        begin
          @main_panels = main_panels
          @drawer_panels = drawer_panels
        rescue => exception
          render_in_layout "lookbook/error", layout: "lookbook/application", error: prettify_error(exception)
        end
      else
        show_404
      end
    end
  end
end
