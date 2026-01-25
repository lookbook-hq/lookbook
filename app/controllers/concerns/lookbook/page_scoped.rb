module Lookbook
  module PageScoped
    extend ActiveSupport::Concern
    include CollectionScoped

    included do
      before_action :assign_pages
      before_action :assign_page

      protected def assign_pages
        @pages = @resources.filter { _1.resource_type == :page }
      end

      protected def assign_page
        if params[:page]
          @page = @pages.find { _1.to_param == params[:page] }
          raise NotFoundError, "Page not found" unless @page
        end
      end
    end
  end
end
