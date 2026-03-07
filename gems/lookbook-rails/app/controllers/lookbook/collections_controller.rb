module Lookbook
  class CollectionsController < Lookbook::ApplicationController
    def show
      collection = Collection.find(params[:collection])

      raise NotFoundError, "Collection not found" unless collection

      render inertia: {
        resource_id: collection.id,
        collection:
      }
    end
  end
end
