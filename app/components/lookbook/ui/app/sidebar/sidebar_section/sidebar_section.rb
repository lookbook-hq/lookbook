module Lookbook
  module UI
    class SidebarSection < BaseComponent
      with_slot :nav do |id, nav_tree|
        lookbook_nav_tree(id, nav_tree)
      end

      attr_reader :id, :title

      def initialize(id:, title:, filter: true, **kwargs)
        @id = id
        @title = title
        @filter = filter
      end

      def filter? = @filter
    end
  end
end
