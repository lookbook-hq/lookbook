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

    def to_param = @entity.id

    delegate_missing_to :@entity

    protected def hexid(str)
      Digest::MD5.hexdigest(str.to_s)[0..6]
    end
  end
end
