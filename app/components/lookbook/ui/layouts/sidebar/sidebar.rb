module Lookbook
  module UI
    class Sidebar < BaseComponent
      with_slot :previews_nav do |nav_tree|
        previews.with_nav("sidebar-previews-nav", nav_tree)
        previews
      end

      with_slot :pages_nav do |nav_tree|
        pages.with_nav("sidebar-pages-nav", nav_tree)
        pages
      end

      private

      def previews
        @previews ||= SidebarSection.new(
          id: "sidebar-previews",
          title: config.previews_nav_label,
          filter: config.previews_nav_filter
        )
      end

      def pages
        @pages ||= SidebarSection.new(
          id: "sidebar-pages",
          title: config.pages_nav_label,
          filter: config.pages_nav_filter
        )
      end
    end
  end
end
