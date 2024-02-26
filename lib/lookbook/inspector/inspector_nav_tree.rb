module Lookbook
  class InspectorNavTree < EntityTree
    def initialize(previews, inspector_targets)
      super([previews, inspector_targets].flatten)
    end

    protected

    def tree_node(path, entity)
      node = EntityTreeNode.new(path, entity)
      if entity.is_a?(PreviewEntity)
        node.children << EntityTreeNode.new("#{path}/index", entity, index: true)
      end
      node
    end
  end
end
