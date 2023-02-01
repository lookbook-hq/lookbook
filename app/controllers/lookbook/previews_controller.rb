module Lookbook
  class PreviewsController < ApplicationController
    include TargetableConcern
    include WithPreviewControllerConcern

    before_action { response.headers.delete('X-Frame-Options') }

    layout "lookbook/inspector"
    helper Lookbook::PreviewHelper

    def self.controller_path
      "lookbook/previews"
    end

    def index
      respond_to do |format|
        format.json do
          render(
            json: Lookbook.previews.map do |preview|
              {
                name: preview.name,
                examples: preview.examples.map { |example|
                  case example
                  when Lookbook::PreviewExample
                    example_json(example)
                  when Lookbook::PreviewGroup
                    {
                      name: example.name,
                      examples: example.examples.map { |ex| example_json(ex) }
                    }
                  end
                }
              }
            end
          )
        end
      end
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

    private

    def example_json(example)
      {
        inspect_path: example.url_path,
        name: example.name,
        preview_path: example.preview_path
      }
    end
  end
end
