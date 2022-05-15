module Lookbook
  class Tabs::Tab::Component < Lookbook::Component
    def initialize(ref:, id: nil, label: nil, hotkey: nil, disabled: nil, position: 0, **html_attrs)
      @ref = ref
      @id = id || ref
      @label = label
      @hotkey = hotkey
      @disabled = disabled
      @position = position
      super(**html_attrs)
    end

    def label
      @label.presence || content
    end
  end
end
