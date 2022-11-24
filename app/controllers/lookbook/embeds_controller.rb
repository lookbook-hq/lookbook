module Lookbook
  class EmbedsController < ApplicationController
    include TargetableConcern
    include WithPreviewControllerConcern

    layout "lookbook/embed"
    helper Lookbook::PreviewHelper

    def self.controller_path
      "lookbook/embeds"
    end

    def show
      if @target
        begin
          @embed_panels = embed_panels
        rescue => exception
          render_in_layout "lookbook/error", layout: "lookbook/inspector", error: prettify_error(exception)
        end
      else
        show_404
      end
    end

    private

    def embed_panels
      Array(Lookbook.config.embed_panels).map do |panel_name|
        config = Engine.panels.get_panel(panel_name)
        PanelStore.resolve_config(config, inspector_data) if config
      end.compact
    end
  end
end
