module Lookbook
  class EntityTreeNode
    delegate :url_path, :label, :type, :visible?, :hidden?, to: :entity

    attr_reader :lookup_path

    def initialize(lookup_path, tree, root: false, default_priority: nil)
      @lookup_path = lookup_path
      @default_priority = default_priority
      @tree = tree
      @root = root
    end

    def find_node(entity)
      children.find do |child|
        break child if child.entity.lookup_path == entity.lookup_path

        node = child.find_node(entity)
        break node if node
      end
    end

    def entity
      @entity ||= @tree.get_entity_by_path(lookup_path)
    end

    def search_terms
      parents.map { _1.label.downcase }
    end

    def children
      @children ||= @tree.get_child_entities_by_path(lookup_path).map.with_index(1) do |entity, index|
        EntityTreeNode.new(entity.lookup_path, @tree, default_priority: index)
      end.sort!
    end

    def parent
      @parent ||= (@tree.find_node_by_path(parent_lookup_path) unless root?)
    end

    def child_count
      @children.size
    end

    def parent_lookup_path
      @parent_lookup_path ||= lookup_path.split("/")[0...-1].join("/")
    end

    def parents
      @parents ||= begin
        nodes = []
        current_node = self
        while current_node && !current_node.root?
          nodes << current_node
          current_node = current_node.parent
        end
        nodes.reverse!
      end
    end

    def priority
      entity.priority || @default_priority
    end

    def <=>(other)
      [priority, label] <=> [other.priority, other.label]
    end

    def root? = @root

    def to_hash
      {
        path: lookup_path,
        label: label,
        entity_type: entity_type,
        children: children&.map(&:to_hash)
      }
    end
  end
end
