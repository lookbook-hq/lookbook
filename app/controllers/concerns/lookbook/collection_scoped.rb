module Lookbook
  module CollectionScoped
    extend ActiveSupport::Concern

    included do
      layout "lookbook/collections"

      before_action :assign_collections
      before_action :assign_collection

      protected def assign_collections
        @collections = Collection.all
      end

      protected def assign_collection
        if params[:collection]
          @collection = Collection.find(params[:collection])
          raise NotFoundError, "Collection not found" unless @collection

          @resources = @collection&.resources

          nav_data = @resources.accept(
            Booklet::HashConverter.new(props: {
              id: true,
              ref: false,
              label: true,
              icon: true,
              href: ->(node) { node.url_path },
              leaf: ->(node) { node.leaf? },
              branch: ->(node) { node.branch? }
            })
          )

          @nav_json = JSON.generate(nav_data[:children])
        end
      end
    end
  end
end
