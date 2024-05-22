module Lookbook
  class PagesController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_page, only: :page
    before_action :assign_preview, only: :preview

    def page
      @page_content = render_page(@page)
    end

    def preview
      readme_path = @preview.readme_path
      readme_content = File.read(readme_path) unless readme_path.nil?

      @page = VirtualPageEntity.new(
        @preview.lookup_path,
        readme_content,
        file_path: readme_path,
        url_path: @preview.url_path,
        options: {
          label: @preview.label,
          title: @preview.title,
          footer: false
        }
      )

      template = Lookbook.config.preview_overview_template if readme_path.nil?
      locals = {
        preview: @preview,
        targets: @preview.inspector_targets
      }

      @page_content = render_page(@page, locals, template)
    end

    private

    def render_page(page, locals = {}, template = nil)
      controller = PageRenderer.new
      controller.request = request
      controller.response = ActionDispatch::Response.new

      controller.process(:render_page, page, locals, template)
    end

    def assign_page
      @page = Pages.all.find { _1.lookup_path == params[:path] }
      raise ActionController::RoutingError, "Could not find page '#{params[:path]}'" unless @page
    end
  end
end
