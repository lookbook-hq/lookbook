module ViewComponents
  class ParagraphComponentPreview < Lookbook::Preview
    def default_text
      render ViewComponents::ParagraphComponent.new
    end

    def text_as_kwarg
      render ViewComponents::ParagraphComponent.new(text: "Paragraph text from keyword argument")
    end

    def with_text
      render ViewComponents::ParagraphComponent.new(text: "Paragraph text from block")
    end

    # @param text
    def playground(text: "Edit this text via the params panel")
      render ViewComponents::ParagraphComponent.new do
        text
      end
    end
  end
end
