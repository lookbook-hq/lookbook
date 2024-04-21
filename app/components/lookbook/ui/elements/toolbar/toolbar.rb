module Lookbook
  module UI
    class Toolbar < BaseComponent
      with_slot :label

      with_slot :action do |*args, **kwargs|
        lb_button(*args, **kwargs)
      end

      with_slot :tab, Lookbook::UI::ToolbarTab
    end
  end
end
