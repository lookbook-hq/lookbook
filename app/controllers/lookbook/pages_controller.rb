module Lookbook
  class PagesController < ApplicationController
    def self.controller_path
      "lookbook/pages"
    end

    def show
      @page = Lookbook::Page.find(params[:path])
      if @page
        page_content = page_controller.render_to_string(
          inline: @page.content,
          locals: {
            page: @page
          }
        )
        @page_content = @page.markdown? ? Lookbook::Markdown.render(page_content) : page_content
      else
        render "not_found"
      end
    end

    private

    def page_controller
      return @page_controller if @page_controller.present?
      controller_class = Lookbook.config.page_controller.constantize
      controller = controller_class.new
      controller.request = request
      @page_controller ||= controller
    end
  end
end
