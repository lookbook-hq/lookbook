module Lookbook
  class EntityTree
    delegate :to_json, to: :to_hash
    delegate :to_hash, to: :tree

    delegate_missing_to :tree

    attr_reader :entities

    def initialize(entities)
      @entities = entities.to_a
    end

    protected

    def tree_node(path, entity)
      EntityTreeNode.new(path, entity)
    end

    def node_entities
      [entities, directories].flatten
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
      @tree ||= begin
        root_node = EntityTreeNode.new("", nil)

        node_entities.map(&:lookup_path).each do |lookup_path|
          current_path = ""
          current_node = root_node
          path_segments = lookup_path.split("/")

          path_segments.each do |segment|
            current_path = "#{current_path}/#{segment}".delete_prefix("/")
            next_node = current_node.children.find { _1.lookup_path == current_path }

            unless next_node
              entity = node_entities.find { _1.lookup_path == current_path }
              next_node = tree_node(current_path, entity)
              current_node.children << next_node
            end

            current_node = next_node
          end
        end

        root_node
      end
    end
  end
end
