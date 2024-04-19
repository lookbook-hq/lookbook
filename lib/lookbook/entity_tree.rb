module Lookbook
  class EntityTree
    delegate :to_json, to: :to_hash

    delegate_missing_to :tree

    attr_reader :entities

    def initialize(entities)
      @entities = entities.to_a
    end

    def get_entity_by_path(lookup_path)
      node_entities.find { _1.lookup_path == lookup_path }
    end

    def get_child_entities_by_path(lookup_path)
      if lookup_path == ""
        node_entities.select { _1.depth == 1 }
      else
        child_depth = lookup_path.split("/").size + 1
        node_entities.select do |entity|
          entity.depth == child_depth && entity.lookup_path.start_with?("#{lookup_path}/")
        end
      end
    end

    def find_node_by_path(lookup_path)
      entity = node_entities.find { _1.lookup_path == lookup_path }
      tree.find_node(entity) if entity
    end

    protected

    def node_entities
      @node_entities ||= [entities, directories].flatten.sort do |a, b|
        [a.depth, a.label] <=> [b.depth, b.label]
      end
    end

    def directories
      @directories ||= begin
        all_paths = []
        paths = entities.map(&:lookup_directory_path).compact.uniq
        paths.each do |path|
          segments = path.split("/")
          current_path = ""
          segments.each do |segment|
            current_path = "#{current_path}/#{segment}".delete_prefix("/")
            all_paths << current_path
          end
        end
        all_paths.uniq.map { DirectoryEntity.new(_1) }
      end
    end

    def tree
      @tree ||= EntityTreeNode.new("", self, root: true)
    end
  end
end
