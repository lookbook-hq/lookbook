module Lookbook
  class PagesController < ApplicationController
    layout "lookbook/application"
    helper_method :page_controller

    def self.controller_path
      "lookbook/pages"
    end

    def index
      landing = Engine.pages.find(&:landing?) || Engine.pages.first
      if landing.present?
        redirect_to lookbook_page_path(landing.path)
      else
        show_404
      end
    end

    def show
      @page = @pages.find_by_path(params[:path])
      if @page
        @next_page = @pages.next(@page)
        @previous_page = @pages.previous(@page)
        begin
          @page_content = page_controller.render_page(@page)
          @title = @page.title
        rescue => exception
          render_in_layout "lookbook/error",
            layout: "lookbook/application",
            error: Lookbook::Error.new(exception, file_path: @page.file_path, source_code: @page.content)
        end
      else
        show_404
      end
    end

    protected

    def show_404
      render "lookbook/404", locals: {
        message: "Page not found",
        description: "The page may have been removed or renamed."
      }
    end

    def page_controller
      controller_class = Lookbook.config.page_controller.constantize
      controller = controller_class.new
      controller.request = request
      controller
    end
  end
end
