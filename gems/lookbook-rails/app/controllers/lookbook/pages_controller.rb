module Lookbook
  class PagesController < Lookbook::ApplicationController
    def show
      @page = Collection.pages.find { _1.to_param == params[:page] }

      raise NotFoundError, "Page not found" unless @page

      render inertia: {resource_id: @page.id, page: @page, content: @page.call, ancestors:}
    end

    private def ancestors
      @page.ancestors.map { _1.to_inertia(include_children: false) }.reverse
    end
  end
end
