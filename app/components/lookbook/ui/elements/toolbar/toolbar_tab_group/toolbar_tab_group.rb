module Lookbook
  module UI
    class ToolbarTabGroup < BaseComponent
      with_slot :tab do |name, **kwargs|
        Lookbook::UI::ToolbarTab.new(name: name, **kwargs)
      end
    end
  end
end
