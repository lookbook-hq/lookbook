module Lookbook
  module PageActions
    extend ActiveSupport::Concern

    private

    def assign_page
      @page = Pages.all.find { _1.lookup_path == params[:path] }
      raise ActionController::RoutingError, "Could not find page '#{params[:path]}'" unless @page
    end
  end
end
