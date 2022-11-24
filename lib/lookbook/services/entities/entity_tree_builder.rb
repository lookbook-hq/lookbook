module Lookbook
  class EntityTreeBuilder < Service
    attr_reader :include_hidden

    def initialize(entities, include_hidden: false)
      @entities = entities.to_a
      @include_hidden = include_hidden
    end

    def call
      root_node = TreeNode.new
      entities.each do |entity|
        current_node = root_node
        path_segments = parse_segments(entity.logical_path)
        path_segments.each.with_index(1) do |segment, i|
          name, priority_prefix = segment
          content = entity if entity.depth == i # entities are always on the leaf nodes

          current_node.add_child(name, content, priority: priority_prefix) unless current_node.has_child?(name)
          current_node = current_node.get_child(name)

          if content && content.type == :preview
            content.visible_examples.each do |example|
              current_node.add_child(example.name, example)
            end
          end
        end
      end
      root_node
    end

    def parse_segments(path)
      path.split("/").map do |segment|
        unless segment.start_with?(".")
          priority, name = PriorityPrefixParser.call(segment)
          [name, priority || 10000]
        end
      end.compact
    end

    def entities
      include_hidden ? @entities : @entities.select(&:visible?)
    end
  end
end
