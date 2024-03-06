module Lookbook
  module UI
    class App < BaseComponent
      with_slot :header
      with_slot :sidebar, Lookbook::UI::Sidebar
      with_slot :main
    end
  end
end
