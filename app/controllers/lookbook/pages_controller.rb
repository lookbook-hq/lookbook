module Lookbook
  class PagesController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_page, only: :page
    before_action :assign_preview, only: :preview

    def page
      @page_content = render_page(@page)
    end

    def preview
      @page = PageEntity.virtual(
        @preview.lookup_path,
        @preview.url_path,
        frontmatter: {
          label: @preview.label,
          title: @preview.title,
          footer: false,
          data: {
            preview: @preview,
            targets: @preview.inspector_targets
          }
        }
      )

      @page_content = render_page(@page, Lookbook.config.preview_overview_template)
    end

    private

    def render_page(page, template = nil)
      controller = PageRenderer.new
      controller.request = request
      controller.response = ActionDispatch::Response.new

      controller.process(:render_page, page, template)
    end

    def assign_page
      @page = Pages.all.find { _1.lookup_path == params[:path] }
      raise ActionController::RoutingError, "Could not find page '#{params[:path]}'" unless @page
    end
  end
end
