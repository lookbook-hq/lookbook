module Lookbook
  class ButtonGroup::Component < Lookbook::Component
    renders_many :buttons, ->(copy: nil, **attrs) do
      attrs[:size] = @size
      copy.present? ? CopyButton::Component.new(target: copy, **attrs) : Button::Component.new(**attrs)
    end

    def initialize(size: :md, **html_attrs)
      @size = size
      super(**html_attrs)
    end
  end
end
