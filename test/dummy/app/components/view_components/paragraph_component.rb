module ViewComponents
  class ParagraphComponent < ViewComponent::Base
    def initialize(text: "Default paragraph text")
      @text = text
    end

    def call
      tag.div data: {component: "viewcomponent-paragraph"} do
        content || @text
      end
    end
  end
end
