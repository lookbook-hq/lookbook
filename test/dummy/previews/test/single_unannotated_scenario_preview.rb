class SingleUnannotatedScenarioPreview < Lookbook::Preview
  def default
    render ViewComponents::ParagraphComponent.new do
      "standard component content"
    end
  end
end
