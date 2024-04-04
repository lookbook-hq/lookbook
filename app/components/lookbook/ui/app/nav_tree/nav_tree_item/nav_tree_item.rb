module Lookbook
  module UI
    class NavTreeItem < BaseComponent
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

      def initialize(node:, **kwargs)
        @node = node
      end

      def children
        node.children.select(&:visible?)
      end

      def icon
        ENTITY_DISPLAY_ATTRIBUTES.dig(type, :icon) || :folder
      end

      def collection?
        type == :directory || type == :preview
      end
    end
  end
end
