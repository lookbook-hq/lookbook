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

    def root? = true

    protected

    def nodes
      @nodes ||= [@leaf_nodes, *@leaf_nodes.map(&:ancestors)].flatten.uniq
    end
  end
end
