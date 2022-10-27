module Lookbook
  class PreviewsController < ApplicationController
    include TargetableConcern
    include WithPreviewControllerConcern

    layout "lookbook/inspector"
    helper Lookbook::PreviewHelper

    def self.controller_path
      "lookbook/previews"
    end

    def show
      if @target
        begin
          opts = {layout: @preview.layout}
          if params[:lookbook_embed] == "true"
            opts[:append_html] = "<script src=\"/lookbook-assets/js/embed.js?v=#{Lookbook.version}\"></script>".html_safe
          end
          preview_html = preview_controller.process(:render_in_layout_to_string, "lookbook/preview", inspector_data, **opts)
          render html: preview_html
        rescue => exception
          render_in_layout "lookbook/error",
            layout: "lookbook/standalone",
            error: prettify_error(exception)
        end
      else
        show_404 layout: "lookbook/standalone"
      end
    end
  end
end
