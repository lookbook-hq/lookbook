module Lookbook
  module UI
    class Page < BaseComponent
      attr_reader :page

      def initialize(page:, **kwargs)
        @page = page
      end

      def nav_node
        @nav_node ||= Docs.nav_tree.find_entity_node(page)
      end
    end
  end
end
