module Lookbook
  class PagesController < Lookbook::ApplicationController
    before_action :record_last_page_visited, only: %i[show]

    layout "lookbook/pages"

    def index
      if Engine.pages.any?
        landing_page = Engine.pages.find(&:landing?) || Engine.pages.first
        redirect_to lookbook_page_path(landing_page)
      else
        redirect_to lookbook_path
      end
    end

    def show
      @pages = Engine.pages
      @page = @pages.find_by_path(params[:path])

      raise_not_found("Page not found - #{params[:path]}") unless @page

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
