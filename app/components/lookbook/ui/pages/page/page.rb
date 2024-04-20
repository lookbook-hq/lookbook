module Lookbook
  module UI
    class Page < BaseComponent
      attr_reader :page

      def initialize(page:, **kwargs)
        @page = page
      end

      def nav_node
        @nav_node ||= Pages.to_tree.find_node(page)
      end
    end
  end
end
