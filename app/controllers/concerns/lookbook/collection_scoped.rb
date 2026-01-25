module Lookbook
  module CollectionScoped
    extend ActiveSupport::Concern

    included do
      layout "lookbook/collections"

      before_action :assign_collections
      before_action :assign_collection
      before_action :assign_resources

      protected def assign_collections
        @collections = Collection.all
      end

      protected def assign_collection
        if params[:collection]
          @collection = Collection.find(params[:collection])
          raise NotFoundError, "Collection not found" unless @collection
        end
      end

      protected def assign_resources
        @resources = @collection&.resources
      end
    end
  end
end
