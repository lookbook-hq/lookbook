module Lookbook
  class ActionbarButtonComponent < Component
    attr_reader :icon

    def initialize(icon, label = nil, **kwargs)
      @icon = icon
      @label = label

      super(**kwargs)
    end

    def label
      @label || @content || raise("toolbar button must have a label set")
    end
  end
end
