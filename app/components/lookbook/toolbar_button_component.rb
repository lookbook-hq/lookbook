module Lookbook
  class ToolbarButtonComponent < Component
    attr_reader :icon

    def initialize(label:, icon: :icon, **kwargs)
      @label = label
      @icon = icon

      super(**kwargs)
    end

    def label
      @label || @content || raise("toolbar button must have a label set")
    end
  end
end
