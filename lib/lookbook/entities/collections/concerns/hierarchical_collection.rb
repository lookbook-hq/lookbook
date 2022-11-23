module Lookbook
  module HierarchicalCollection
    extend ActiveSupport::Concern

    included do
      def entities
        @_cache[:entities] ||= collect_ordered_entities(to_tree(include_hidden: true))
      end

      def to_tree(include_hidden: false)
        @_cache[include_hidden ? :tree_with_hidden : :tree] ||= EntityTreeBuilder.call(@entities, include_hidden: include_hidden)
      end

      protected

      def collect_ordered_entities(start_node)
        start_node.inject([]) do |entities, node|
          entities.append(node.content? ? node.content : collect_ordered_entities(node))
        end.flatten
      end
    end
  end
end
