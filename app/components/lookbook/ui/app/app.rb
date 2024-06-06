module Lookbook
  module UI
    class App < BaseComponent
      with_slot :header, Lookbook::UI::Header
      with_slot :sidebar, Lookbook::UI::Sidebar
      with_slot :main
      with_slot :status_bar, Lookbook::UI::StatusBar

      def body_split
        {
          orientation: :vertical,
          sizes: ["280px", "auto"],
          min_sizes: [200, 200]
        }
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
