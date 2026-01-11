module Lookbook
  module EntityScoped
    extend ActiveSupport::Concern

    included do
      before_action :assign_entity

      protected

      def assign_entity
        @entity = @collection.resources.find { _1.to_param == params[:entity_path] }
      end
    end
  end
end
