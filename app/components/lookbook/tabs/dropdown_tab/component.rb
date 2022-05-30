module Lookbook
  class Tabs::DropdownTab::Component < Lookbook::Component
    def initialize(ref:, label: nil, hotkey: nil, disabled: nil, position: 0, **html_attrs)
      @ref = ref
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
