module Lookbook
  module UI
    class NavTreeItem < BaseComponent
      delegate :label, :children, :icon, :inspect_path, :lookup_path, to: :node

      tag_attr :href, :key

      attr_reader :node

      def initialize(node:, **kwargs)
        @node = node
      end
    end
  end
end
