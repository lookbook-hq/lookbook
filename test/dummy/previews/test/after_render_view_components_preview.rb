# @after_render :preview_after_render
class AfterRenderViewComponentsPreview < ViewComponent::Preview
  def default
    render ViewComponents::ParagraphComponent.new do
      "default after render content"
    end
  end

  # @after_render :scenario_after_render
  def custom
    render ViewComponents::ParagraphComponent.new do
      "custom after render content"
    end
  end

  private

  def preview_after_render(html)
    "<em>preview</em>#{html}"
  end

  def scenario_after_render(html)
    "<strong>scenario</strong>#{html}"
  end
end
