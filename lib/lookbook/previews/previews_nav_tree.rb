module Lookbook
  class PreviewsNavTree < EntityTree
    def initialize(previews)
      inspectables = previews.map { _1.inspector_targets.filter(&:visible?) }.flatten
      super([previews, inspectables].flatten)
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
