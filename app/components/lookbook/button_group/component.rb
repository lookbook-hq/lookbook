module Lookbook
  class ButtonGroup::Component < Lookbook::Component
    renders_many :buttons, ->(copy: nil, **attrs, &block) do
      attrs[:size] = @size
      instance = if copy.present?
        CopyButton::Component.new(target: copy, **attrs)
      else
        Button::Component.new(**attrs)
      end
      render instance, &block
    end

    def initialize(size: :md, **html_attrs)
      @size = size
      super(**html_attrs)
    end
  end
end
