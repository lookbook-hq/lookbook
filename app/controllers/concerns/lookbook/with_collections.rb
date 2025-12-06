module Lookbook
  module WithCollections
    extend ActiveSupport::Concern

    included do
      before_action :assign_collections

      protected

      def assign_collections
        @collections = Collection.all
      end

      def assign_collection
        @collection = Collection.find(params[:collection])
      end
    end
  end
end
