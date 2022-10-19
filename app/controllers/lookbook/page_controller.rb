module Lookbook
  class PageController < ActionController::Base
    helper Lookbook::ComponentHelper
    helper Lookbook::PageHelper
    helper Lookbook::OutputHelper

    Lookbook.config.page_paths.each do |path|
      prepend_view_path Rails.root.join(path)
    end

    def render_page(page, locals = {})
      @page = page
      @pages = Lookbook.pages
      @next_page = @pages.find_next(@page)
      @previous_page = @pages.find_previous(@page)
      content = render_to_string inline: @page.content, locals: {
        page: @page,
        next_page: @next_page,
        previous_page: @previous_page,
        pages: @pages
      }
      @page.markdown? ? MarkdownRenderer.call(content, Lookbook.config.markdown_options) : content
    end
  end
end
