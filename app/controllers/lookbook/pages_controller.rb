module Lookbook
  class PagesController < Lookbook::ApplicationController
    before_action :record_last_page_visited, only: %i[show]

    layout "lookbook/pages"

    def index
      landing = Engine.pages.find(&:landing?) || Engine.pages.first
      raise_not_found("Page not found") unless landing.present?

      redirect_to lookbook_page_path(landing.path)
    end

    def show
      @pages = Engine.pages

      @page = @pages.find_by_path(params[:path])
      raise_not_found("Page not found") unless @page

      @next_page = @pages.next(@page)
      @previous_page = @pages.previous(@page)

      @page_content = ActionViewConfigHandler.call do
        content = render_to_string inline: @page.content, locals: {
          page: @page,
          next_page: @next_page,
          previous_page: @previous_page,
          pages: @pages
        }
        CGI.escapeHTML content
      end
    end

    protected

    def record_last_page_visited
      cookies[:lookbook_last_page_visited] = {
        value: request.path,
        expires: 1.hour.from_now
      }
    end
  end
end
