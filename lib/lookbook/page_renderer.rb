module Lookbook
  module PageRenderer
    class << self
      def render(page, request, locals = {})
        content = page_controller(request).render_to_string(
          inline: page.content,
          locals: {
            page: page,
            pages: Lookbook.pages,
            next_page: Lookbook.pages.find_next(page),
            previous_page: Lookbook.pages.find_previous(page)
          }
        )
        page.markdown? ? Lookbook::Markdown.render(content) : content
      end

      protected

      def page_controller(request = nil)
        controller_class = Lookbook.config.page_controller.constantize
        controller = controller_class.new
        controller.request = request if request.present?
        controller
      end
    end
  end
end
