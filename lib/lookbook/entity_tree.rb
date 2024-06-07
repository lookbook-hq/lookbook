module Lookbook
  class EntityTree
    include EntityTreeNode

    attr_reader :lookup_path

    def initialize(leaf_nodes = [], config_path: nil)
      @leaf_nodes = leaf_nodes
      @config_path = config_path
      @lookup_path = ""
    end

    def children
      @children ||= begin
        child_nodes = nodes.select { _1.depth == 1 }.sort
        ListResolver.call(config.fetch(:children, "*"), child_nodes.map(&:name)) do |name|
          child_nodes.find { _1.name == name }
        end
      end
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

    def config
      @config ||= begin
        opts = if @config_path && File.exist?(@config_path)
          YAML.safe_load_file(@config_path)
        end
        DataObject.new(opts || {})
      end
    end
  end
end
