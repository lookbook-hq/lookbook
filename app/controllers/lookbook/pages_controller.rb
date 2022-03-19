module Lookbook
  class PagesController < ApplicationController
    def self.controller_path
      "lookbook/pages"
    end

    def show
      @pages = Lookbook.pages
      @page = Lookbook.pages.find_by_path(params[:path])
      if @page
        @page_content = Lookbook::PageRenderer.render(@page, request, {})
        @next_page = Lookbook.pages.find_next(@page)
        @previous_page = Lookbook.pages.find_previous(@page)
      else
        render "not_found"
      end
    end
  end
end
