module Lookbook
  module UI
    class Sidebar < BaseComponent
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

      def sidebar_split
        {
          orientation: :horizontal,
          sizes: nav_panels.map { "#{100 / nav_panels.size}%" },
          min_sizes: nav_panels.map { 100 }
        }
      end

      def nav_panels
        config.ui_nav_panels.take(2).filter do |name|
          case name.to_sym
          when :previews
            previews_nav?
          when :pages
            pages_nav?
          else
            false
          end
        end
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
