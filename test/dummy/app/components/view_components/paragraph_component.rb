module ViewComponents
  class ParagraphComponent < ViewComponent::Base
    def initialize(text: "Default paragraph text")
      @text = text
    end

    def call
      tag.p data: {component: "viewcomponent-paragraph"} do
        content || @text
      end
    end
  end
end
