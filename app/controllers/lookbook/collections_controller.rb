module Lookbook
  class CollectionsController < Lookbook::ApplicationController
    include CollectionScoped

    def show
      converter = Booklet::HashConverter.new(props: {
        # path: lambda { |node| node.file.relative_path(@collection.path) }
      })
      @json = JSON.pretty_generate(@collection.entities.accept(converter))
    end
  end
end
