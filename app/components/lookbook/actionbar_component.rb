module Lookbook
  class ActionbarComponent < Component
    include SlotableConcern

    with_slot :action do |*args|
      ActionbarButtonComponent.new(*args)
    end

    def initialize(**kwargs)
      super
    end
  end
end
