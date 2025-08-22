module Lookbook
  class SplitLayoutComponent < Component
    include SlotableConcern

    with_slot :pane

    attr_reader :orientation

    def initialize(id:, orientation: "horizontal", **kwargs)
      @orientation = orientation

      super(id: id, **kwargs)
    end
  end
end
