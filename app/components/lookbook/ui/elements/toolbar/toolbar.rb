module Lookbook
  module UI
    class Toolbar < BaseComponent
      with_slot :label

      with_slot :breadcrumb do |*args|
        lb_breadcrumbs(*args)
      end

      with_slot :button_group, Lookbook::UI::ButtonGroup

      with_slot :tab_group, Lookbook::UI::ToolbarTabGroup
    end
  end
end
