module Lookbook
  class TabGroupComponent < Component
    include SlotableConcern

    with_slot :tab do |**kwargs|
      TabComponent.new(**kwargs)
    end

    with_slot :action do |**kwargs|
      ToolbarButtonComponent.new(**kwargs)
    end

    with_slot :panel do |**kwargs|
      TabPanelComponent.new(**kwargs)
    end

    def initialize(**kwargs)
      super
    end
  end
end
