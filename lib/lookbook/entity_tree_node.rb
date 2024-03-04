module Lookbook
  class EntityTreeNode
    delegate :url_path, :label, :type, to: :entity

    attr_reader :entity, :children, :lookup_path

    def initialize(lookup_path, entity = nil)
      @lookup_path = lookup_path
      @entity = entity
      @children = []
    end

    def to_hash
      {
        path: lookup_path,
        label: label,
        entity_type: entity_type,
        children: children&.map(&:to_hash)
      }
    end
  end
end
