class EmbedComponentPreview < ViewComponent::Preview
  def basic
    render Lookbook::Embed::Component.new(
      id: "workbench-embed-preview-button-group",
      example: Lookbook.previews.find_example("button_group/default")
    )
  end

  def with_params
    render Lookbook::Embed::Component.new(
      id: "workbench-embed-preview-button-playground",
      example: Lookbook.previews.find_example("button/playground"),
      params: {
        icon: :thumbs_up,
        size: :lg
      }
    )
  end
end
