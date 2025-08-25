module ViewComponents
  class ParagraphComponentPreview < Lookbook::Preview
    def default_text
      render ViewComponents::ParagraphComponent.new
    end

    def text_as_kwarg
      render ViewComponents::ParagraphComponent.new(text: "Paragraph text from keyword argument")
    end

    def text_as_block
      render ViewComponents::ParagraphComponent.new(text: "Paragraph text from block")
    end

    # @param text

    def text_param(text: "Edit this text via the params panel")
      render ViewComponents::ParagraphComponent.new(text: text)
    end
  end
end
