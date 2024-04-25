module Lookbook
  module UI
    class Layout < BaseComponent
      with_slot :header, Lookbook::UI::Header
      with_slot :main
      with_slot :status_bar, Lookbook::UI::StatusBar

      with_slot :previews_nav do |tree, **kwargs|
        Lookbook::UI::Nav.new(
          id: "previews-nav-tree",
          tree: tree,
          filter: config.previews_nav_filter,
          placeholder: "Component previews will appear here as you add them.",
          **kwargs
        )
      end

      with_slot :pages_nav do |tree, **kwargs|
        Lookbook::UI::Nav.new(
          id: "pages-nav-tree",
          tree: tree,
          filter: config.pages_nav_filter,
          placeholder: "Your pages will appear here as you add them.",
          **kwargs
        )
      end

      def pages
        Lookbook::Pages
      end

      def previews
        Lookbook::Previews
      end
    end
  end
end
