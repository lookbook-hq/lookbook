module Lookbook
  class InspectorController < ApplicationController
    include TargetableConcern
    include WithPreviewControllerConcern

    layout "lookbook/inspector"
    helper Lookbook::PreviewHelper

    def self.controller_path
      "lookbook/inspector"
    end

    def show
      if @target
        begin
          @main_panels = main_panels
          @drawer_panels = drawer_panels
        rescue => exception
          render_in_layout "lookbook/error", layout: "lookbook/inspector", error: prettify_error(exception)
        end
      else
        show_404
      end
    end

    def show_legacy
      Lookbook.logger.warn("Legacy URL path detected. These paths are deprecated and will be removed in a future version")
      redirect_to lookbook_inspect_path params[:path]
    end

    private

    def main_panels
      Engine.panels.in_group(:main).map do |config|
        PanelStore.resolve_config(config, inspector_data)
      end
    end

    def drawer_panels
      Engine.panels.in_group(:drawer).map do |config|
        PanelStore.resolve_config(config, inspector_data)
      end
    end
  end
end
