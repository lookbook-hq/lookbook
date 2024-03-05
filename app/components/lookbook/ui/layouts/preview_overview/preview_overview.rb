module Lookbook
  module UI
    class PreviewOverview < BaseComponent
      attr_reader :id, :preview, :targets

      def initialize(preview:, targets: [], id: "preview-overview", **kwargs)
        @id = id
        @preview = preview
        @targets = targets
      end

      def previews_nav_label
        Lookbook.config.previews_nav_label
      end

      def nav_node
        @nav_node ||= Inspector.nav_tree.find_entity_node(preview)
      end

      def breadcrumbs = nav_node.parents
    end
  end
end
