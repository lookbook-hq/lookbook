module Lookbook
  class EntityTreeNode
    attr_reader :entity

    delegate_missing_to :entity

    def initialize(entity, tree)
      @entity = entity
      @tree = tree
    end

    def depth
      entity.lookup_path.split("/").size - 1
    end

    def leaf?
      children.nil?
    end

    def children
      @children ||= if entity.respond_to?(:children)
        entity.children&.map { EntityTreeNode.new(_1, tree) }
      elsif entity.is_a?(DirectoryEntity)
        tree.children_of(self)
      end
    end

    def icon
      entity.class.icon
    end

    def to_hash
      {
        path: entity.lookup_path,
        root: false,
        leaf: leaf?,
        children: children&.map(&:to_hash)
      }
    end

    protected

    attr_reader :tree
  end
end
