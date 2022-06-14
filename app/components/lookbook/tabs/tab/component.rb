module Lookbook
  class Tabs::Tab::Component < Lookbook::Component
    def initialize(name:, label: nil, hotkey: nil, disabled: nil, position: 0, **html_attrs)
      @name = name
      @label = label
      @hotkey = hotkey
      @disabled = disabled
      @position = position
      super(**html_attrs)
    end

    def label
      @label.presence || content || @name.titleize
    end
  end
end
