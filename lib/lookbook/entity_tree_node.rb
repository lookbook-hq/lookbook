module Lookbook
  class EntityTreeNode
    delegate :url_path, :label, :type, to: :entity

    attr_reader :entity, :children, :lookup_path, :parent

    def initialize(lookup_path, entity = nil, root: false)
      @lookup_path = lookup_path
      @entity = entity
      @children = []
      @root = root
      @parent = nil
    end

    def find_entity_node(entity)
      children.find do |child|
        break child if child.entity.lookup_path == entity.lookup_path

        node = child.find_entity_node(entity)
        break node if node
      end
    end

    def parent=(node)
      raise "Parent node has already been defined" if @parent
      @parent = node
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
