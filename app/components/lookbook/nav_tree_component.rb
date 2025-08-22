module Lookbook
  class NavTreeComponent < Component
    def initialize(collection, label: nil, **kwargs)
      @tree = collection.to_tree
      @collection = collection
      @label = label

      super(**kwargs)
    end

    def label
      @label || collection.name.titlize
    end

    def children
      tree.children.map { NavTreeItemComponent.new(_1) }
    end

    protected

    attr_reader :tree, :collection
  end
end
