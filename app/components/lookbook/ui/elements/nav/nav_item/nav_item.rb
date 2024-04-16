module Lookbook
  module UI
    class NavItem < BaseComponent
      ENTITY_DISPLAY_ATTRIBUTES = {
        preview: {
          icon: :layers
        },
        inspector_target: {
          icon: :eye
        },
        directory: {
          icon: :folder
        },
        page: {
          icon: :file
        }
      }

      delegate :label, :priority, :lookup_path, :url_path, :type, :search_terms, to: :node

      attr_reader :node

      def initialize(node:, selected: false, **kwargs)
        @node = node
      end

      def children
        node.children.select(&:visible?)
      end

      def icon
        ENTITY_DISPLAY_ATTRIBUTES.dig(type, :icon) || :folder
      end

      def depth
        lookup_path.split("/").size - 1
      end

      def collection?
        type == :directory || type == :preview
      end
    end
  end
end
