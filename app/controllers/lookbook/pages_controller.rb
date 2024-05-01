module Lookbook
  class PagesController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_page, only: :page
    before_action :assign_preview, only: :preview

    def page
      @page_content = render_to_string(
        inline: @page.content,
        layout: false,
        locals: page_locals
      )
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

      @page_content = render_to_string(
        Lookbook.config.preview_overview_template,
        layout: false,
        locals: page_locals
      )
    end

    private

    def assign_page
      @page = Pages.all.find { _1.lookup_path == params[:path] }
      raise ActionController::RoutingError, "Could not find page '#{params[:path]}'" unless @page
    end

    def page_locals
      {
        config: Lookbook.config,
        previews: Previews,
        pages: Pages,
        page: @page,
        previous_page: @page.previous,
        next_page: @page.next
      }
    end
  end
end
