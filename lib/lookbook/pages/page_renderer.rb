module Lookbook
  class PageRenderer < ActionController::Base
    helper PageHelper

    layout false

    def render_page(page, locals = {})
      locals = {
        config: Lookbook.config,
        previews: Previews,
        pages: Pages,
        page: page,
        previous_page: page.previous,
        next_page: page.next,
        **locals
      }

      render inline: page.content, locals: locals
    end
  end
end
