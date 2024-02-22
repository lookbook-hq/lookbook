module Lookbook
  class EntityTreeNode
    attr_reader :entity

    delegate_missing_to :entity

    def initialize(entity, tree, index: false)
      @entity = entity
      @tree = tree
      @index = index
    end

    def label
      @index ? "Overview" : entity.label
    end

    def depth
      lookup_path.split("/").size - 1
    end

    def children
      return [] if index?

      @children ||= if entity.respond_to?(:children)
        children = entity.children&.map { EntityTreeNode.new(_1, tree) }
        children.unshift(EntityTreeNode.new(entity, tree, index: true))
        children
      elsif entity.is_a?(DirectoryEntity)
        tree.children_of(self)
      end
    end

    def icon
      index? ? :info : entity.class.icon
    end

    def leaf? = children.nil?

    def index? = @index

    def to_hash
      {
        path: lookup_path,
        root: false,
        leaf: leaf?,
        children: children&.map(&:to_hash)
      }
    end

    protected

    attr_reader :tree
  end
end
