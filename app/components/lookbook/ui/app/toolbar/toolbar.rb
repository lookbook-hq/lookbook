module Lookbook
  module UI
    class Toolbar < BaseComponent
      with_slot :title

      with_slot :action do |*args, **kwargs|
        lookbook_button(*args, **kwargs)
      end

      with_slot :tab, Lookbook::UI::ToolbarTab
    end
  end
end
