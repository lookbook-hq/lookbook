module Lookbook
  class ResourceNode < Booklet::Node
    include Lookbook::Engine.routes.url_helpers

    prop :entity, Booklet::Node

    def collection
      @collection ||= Collection.all.find do |collection|
        collection.path.to_s == root.ref.raw
      end
    end

    def url_path = nil

    delegate_missing_to :@entity

    def to_param
      @lookup_path ||= @entity.lookup_path(separator: ":") do |node|
        node.lookup_value unless node.root?
      end
    end
  end
end
