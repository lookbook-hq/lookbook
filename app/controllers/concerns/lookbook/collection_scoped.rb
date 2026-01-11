module Lookbook
  module CollectionScoped
    extend ActiveSupport::Concern

    included do
      before_action :assign_collection

      protected

      def assign_collection
        @collection = Collection.find(params[:collection_id]) if params[:collection_id]
      end
    end
  end
end
