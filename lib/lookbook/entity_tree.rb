module Lookbook
  class EntityTree
    include EntityTreeNode

    attr_reader :lookup_path

    def initialize(leaf_nodes = [])
      @leaf_nodes = leaf_nodes
      @lookup_path = ""
    end

    def children
      @children ||= nodes.select { _1.depth == 1 }.sort
    end

    def children_of(parent)
      nodes.select do |node|
        node.depth == parent.depth + 1 &&
          node.lookup_path.start_with?("#{parent.lookup_path}/")
      end
    end

    def next(node)
      nodes = navigable_nodes.filter(&:visible?)
      index = nodes.index(node)
      nodes[index + 1] unless node == nodes.last
    end

    def previous(node)
      nodes = navigable_nodes.filter(&:visible?)
      index = nodes.index(node)
      nodes[index - 1] unless node == nodes.first
    end

    def root? = true

    def to_data
      children.map(&:to_h)
    end

    protected

    def navigable_nodes
      ordered_nodes.select(&:navigable?)
    end

    def ordered_nodes
      @ordered_nodes ||= collect_ordered_entities(self).flatten
    end

    def nodes
      @nodes ||= begin
        node_entities = [@leaf_nodes, *@leaf_nodes.map(&:ancestors)].flatten.uniq
        node_entities.sort_by { _1.lookup_path }
      end
    end

    def collect_ordered_entities(start_node)
      start_node.children.flat_map do |node|
        child_nodes = collect_ordered_entities(node)
        [node, child_nodes]
      end
    end
  end
end
