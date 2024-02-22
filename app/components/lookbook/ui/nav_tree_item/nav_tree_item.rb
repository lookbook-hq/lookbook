module Lookbook
  module UI
    class NavTreeItem < BaseComponent
      delegate :label, :children, :icon, :lookup_path, :entity, :index?, to: :node

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
          preview_inspector_path(entity)
        elsif entity.is_a?(ScenarioEntity)
          scenario_inspector_path(entity.preview, entity)
        end
      end
    end
  end
end
