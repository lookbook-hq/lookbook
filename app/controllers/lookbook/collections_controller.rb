module Lookbook
  class CollectionsController < Lookbook::ApplicationController
    include WithCollections

    before_action :assign_collection, only: :show

    def show
      @json = JSON.pretty_generate(@collection.entities.accept(HashConverter.new))
    end
  end
end
