# @display centered true
class EmbedComponentPreview < ViewComponent::Preview
  def basic
    render Lookbook::Embed::Component.new(
      id: "workbench-embed-preview-button-group",
      example: Lookbook::Engine.previews.find_example_by_path("button_group/default")
    )
  end

  def with_params
    render Lookbook::Embed::Component.new(
      id: "workbench-embed-preview-button-playground",
      example: Lookbook::Engine.previews.find_example_by_path("button/playground"),
      params: {
        icon: :thumbs_up,
        size: :lg
      }
    )
  end
end
