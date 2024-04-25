module Lookbook
  module UI
    class NavItem < BaseComponent
      ENTITY_DISPLAY_ATTRIBUTES = {
        preview: {
          icon: :layers
        },
        inspect: {
          icon: :eye
        },
        directory: {
          icon: :folder
        },
        page: {
          icon: :file
        }
      }

      delegate :label, :priority, :depth, :lookup_path, :url_path, :search_terms, to: :node

      attr_reader :node

      def initialize(node:, selected: false, **kwargs)
        @node = node
      end

      def children
        node.children.select(&:visible?)
      end

      def icon
        ENTITY_DISPLAY_ATTRIBUTES.dig(node.type, :icon) || :folder
      end

      def indentation = depth - 1

      def collection? = children.any?
    end
  end
end
