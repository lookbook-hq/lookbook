module Lookbook
  class Tabs::Tab::Component < Lookbook::Component
    def initialize(ref:, id: nil, label: nil, hotkey: nil, disabled: nil, **html_attrs)
      @ref = ref
      @id = id || ref
      @label = label
      @hotkey = hotkey
      @disabled = disabled
      super(**html_attrs)
    end

    def label
      @label.presence || content
    end
  end
end
