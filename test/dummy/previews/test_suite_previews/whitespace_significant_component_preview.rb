module TestSuitePreviews
  class WhitespaceSignificantComponentPreview < ViewComponent::Preview
    def default
      render ViewComponents::WhitespaceSignificantComponent.new
    end
  end
end
