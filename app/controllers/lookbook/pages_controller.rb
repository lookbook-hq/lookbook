module Lookbook
  class PagesController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_page, only: :page
    before_action :assign_preview, only: :preview

    def page
      @page_content = render_page(@page)
    end

    def preview
      @page = @preview.readme_page

      locals = {
        preview: @preview,
        targets: @preview.inspector_targets
      }

      @page_content = if @page
        render_page(@page, locals)
      else
        render_to_string(Lookbook.config.preview_overview_template, locals: locals, layout: false)
      end
    end

    private

    def render_page(page, locals = {})
      controller = PageRenderer.new
      controller.request = request
      controller.response = ActionDispatch::Response.new

      controller.process(:render_page, page, locals)
    end

    def assign_page
      @page = Pages.all.find { _1.lookup_path == params[:path] }
      raise ActionController::RoutingError, "Could not find page '#{params[:path]}'" unless @page
    end
  end
end
