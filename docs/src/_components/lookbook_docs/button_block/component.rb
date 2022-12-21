module LookbookDocs
  class ButtonBlock::Component < Base
    renders_one :button, ->(text = nil, **opts) do
      opts[:text] = text if text
      Button::Component.new(**opts)
    end
  end
end
