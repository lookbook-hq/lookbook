# @after_render :preview_after_render
class AfterRenderComponentsPreview < Lookbook::Preview
  def default
    render ViewComponents::TitleAndContentComponent.new do
      "default after render content"
    end
  end

  # @after_render :scenario_after_render
  def custom
    render ViewComponents::TitleAndContentComponent.new do
      "custom after render content"
    end
  end

  # @after_render :uses_context_after_render
  def with_context(foo: "bar")
    render ViewComponents::TitleAndContentComponent.new do
      "after render using context info"
    end
  end

  private

  def preview_after_render(html)
    "<em>preview</em>#{html}"
  end

  def scenario_after_render(html)
    "<strong>scenario</strong>#{html}"
  end

  def uses_context_after_render(html, context)
    "<strong>#{context.scenario.name}</strong>#{html}"
  end
end
