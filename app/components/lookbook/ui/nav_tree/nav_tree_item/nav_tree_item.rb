module Lookbook
  module UI
    class NavTreeItem < BaseComponent
      delegate :label, :icon, :lookup_path, :children, :entity, :index?, to: :node

      tag_attr :href, :key, :leaf

      attr_reader :node

      def initialize(node:, **kwargs)
        @node = node
      end

      def key
        index? ? "#{lookup_path}/index" : lookup_path
      end

      def nav_path
        if entity.is_a?(PreviewEntity) && index?
          preview_overview_path(entity)
        elsif entity.is_a?(InspectableEntity)
          inspector_path(entity.preview, entity)
        end
      end
    end
  end
end
