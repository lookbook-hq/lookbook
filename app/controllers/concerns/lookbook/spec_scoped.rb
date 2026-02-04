module Lookbook
  module SpecScoped
    extend ActiveSupport::Concern

    included do
      before_action :assign_spec

      private def assign_spec
        if params[:spec]
          @spec = Collection.specs.find { _1.to_param == params[:spec] }

          raise NotFoundError, "Spec not found" unless @spec

          @collection = @spec.collection
        end
      end
    end
  end
end
