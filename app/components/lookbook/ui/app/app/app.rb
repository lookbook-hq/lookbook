module Lookbook
  module UI
    class App < BaseComponent
      with_slot :header
      with_slot :sidebar, Lookbook::UI::Sidebar
      with_slot :main
      with_slot :status_bar, Lookbook::UI::StatusBar
    end
  end
end
