module Lookbook
  class EntityTreeNode
    attr_reader :entity, :children, :lookup_path

    def initialize(lookup_path, entity = nil, index: false)
      @lookup_path = lookup_path
      @entity = entity
      @index = index
      @children = []
    end

    def to_hash
      {
        path: lookup_path,
        entity_class: entity&.class&.name,
        children: children&.map(&:to_hash)
      }
    end

    def label
      entity&.label
    end

    def index? = @index
  end
end
