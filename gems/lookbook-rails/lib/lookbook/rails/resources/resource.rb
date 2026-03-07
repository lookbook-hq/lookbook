module Lookbook::Rails
  class Resource < Lookbook::Node
    include Lookbook::Rails::Engine.routes.url_helpers
    include Lookbook::Rails::Engine.helpers
    include Lookbook::InertiaRails::Serializable

    prop :entity, Lookbook::Node

    delegate :ref, :id, to: :@entity

    inertia_props :id, :label, :children, :href, :type, [:leaf, :leaf?]

    def collection
      @collection ||= Collection.all.find do |collection|
        collection.path.to_s == root.path.to_s
      end
    end

    def path = @entity.path

    def url_path = nil
    alias_method :href, :url_path

    def to_param = @entity.id

    def type
      @entity.class.name.demodulize.delete_suffix("Node").dasherize.downcase
    end

    delegate_missing_to :@entity
  end
end
