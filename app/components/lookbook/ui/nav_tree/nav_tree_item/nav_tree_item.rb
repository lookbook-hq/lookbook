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

      delegate :label, :lookup_path, :children, :url_path, :type, to: :node

      tag_attr :href, :key

      attr_reader :node

      def initialize(node:, **kwargs)
        @node = node
      end

      def icon
        ENTITY_DISPLAY_ATTRIBUTES.dig(type, :icon) || :folder
      end
    end
  end
end
