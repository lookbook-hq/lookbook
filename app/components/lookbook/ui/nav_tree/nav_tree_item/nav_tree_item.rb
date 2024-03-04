module Lookbook
  module UI
    class NavTreeItem < BaseComponent
      delegate :label, :icon, :lookup_path, :children, :entity, :index?, to: :node

      tag_attr :href, :key

      attr_reader :node

      def initialize(node:, **kwargs)
        @node = node
      end

      def nav_path
        if entity.is_a?(PreviewEntity)
          show_preview_path(entity)
        elsif entity.is_a?(InspectorTargetEntity)
          inspect_target_path(entity.preview, entity)
        end
      end

      def icon
        if entity.is_a?(PreviewEntity)
          index? ? :info : :layers
        elsif entity.is_a?(InspectorTargetEntity)
          :eye
        else
          :folder
        end
      end
    end
  end
end
