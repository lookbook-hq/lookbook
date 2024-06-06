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

      def body_split
        {
          orientation: :vertical,
          sizes: ["280px", "auto"],
          min_sizes: [200, 200]
        }
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
    end
  end
end
