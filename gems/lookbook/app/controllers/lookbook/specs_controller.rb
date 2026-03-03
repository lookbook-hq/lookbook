module Lookbook
  class SpecsController < Lookbook::ApplicationController
    def show
      spec = Collection.specs.find { _1.to_param == params[:spec] }

      raise NotFoundError, "Spec not found" unless spec

      render inertia: {
        spec:,
        resource_id: spec.id,
        collection_id: spec.collection.id
      }
    end
  end
end
