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
      nodes[index(node) + 1] unless node == nodes.last
    end

    def previous(node)
      nodes = navigable_nodes.filter(&:visible?)
      nodes[index(node) - 1] unless node == nodes.first
    end

    def index(node)
      navigable_nodes.index(node)
    end

    def root? = true

    protected

    def navigable_nodes
      nodes.select(&:navigable?)
    end

    def nodes
      @nodes ||= begin
        node_entities = [@leaf_nodes, *@leaf_nodes.map(&:ancestors)].flatten.uniq
        node_entities.sort_by { _1.lookup_path }
      end
    end
  end
end
