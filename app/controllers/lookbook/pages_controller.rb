module Lookbook
  class PagesController < Lookbook::ApplicationController
    def show
      @page = Collection.pages.find { _1.to_param == params[:page] }

      raise NotFoundError, "Page not found" unless @page

      @collection = @page.collection
    end
  end
end
