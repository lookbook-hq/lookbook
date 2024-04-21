module Lookbook
  module UI
    class Layout < BaseComponent
      with_slot :header, Lookbook::UI::Header
      with_slot :main
      with_slot :status_bar, Lookbook::UI::StatusBar

      with_slot :previews_nav do |tree, **kwargs|
        Lookbook::UI::Nav.new(id: "previews-nav-tree", tree: tree, filter: config.previews_nav_filter, **kwargs)
      end

      with_slot :pages_nav do |tree, **kwargs|
        Lookbook::UI::Nav.new(id: "pages-nav-tree", tree: tree, filter: config.pages_nav_filter, **kwargs)
      end
    end
  end
end
