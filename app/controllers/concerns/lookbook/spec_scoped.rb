module Lookbook
  module SpecScoped
    extend ActiveSupport::Concern
    include CollectionScoped

    included do
      before_action :assign_specs
      before_action :assign_spec

      private def assign_specs
        @specs = @resources.filter { _1.is_a?(Spec) }
      end

      private def assign_spec
        if params[:spec]
          @spec = @specs.find { _1.to_param == params[:spec] }
          raise NotFoundError, "Spec not found" unless @spec
        end
      end
    end
  end
end
