module Lookbook
  class EntityTree
    delegate :to_json, to: :to_hash

    def initialize(entities)
      @entities = entities.to_a
    end

    def children
      nodes.filter { _1.depth == 0 }
    end

    def children_of(node)
      nodes.filter { _1.lookup_path.start_with?("#{node.lookup_path}/") }
    end

    def to_hash
      {
        path: nil,
        root: true,
        leaf: false,
        children: children.map(&:to_hash)
      }
    end

    protected

    attr_reader :entities

    def directories
      dir_paths = entities.map do |entity|
        File.dirname(entity.lookup_path) if entity.lookup_path.include?("/")
      end.compact.uniq

      dir_paths.map { DirectoryEntity.new(_1) }
    end

    def nodes
      @nodes ||= [entities, directories].flatten.map { EntityTreeNode.new(_1, self) }
    end
  end
end
