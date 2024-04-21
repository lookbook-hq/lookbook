module Lookbook
  module UI
    class Toolbar < BaseComponent
      with_slot :label

      with_slot :action do |*args, **kwargs|
        @toolbar_actions << lb_button(*args, **kwargs)
      end

      with_slot :divider do
        @toolbar_actions << :divider
      end

      with_slot :tab, Lookbook::UI::ToolbarTab

      def initialize(**kwargs)
        @toolbar_actions = []
      end
    end
  end
end
