# @display centered true
class EmbedComponentPreview < ViewComponent::Preview
  def basic
    render Lookbook::Embed::Component.new(
      id: "workbench-embed-preview-button-group",
      scenario: Lookbook::Engine.previews.find_scenario_by_path("button_group/default")
    )
  end

  def with_params
    render Lookbook::Embed::Component.new(
      id: "workbench-embed-preview-button-playground",
      scenario: Lookbook::Engine.previews.find_scenario_by_path("button/playground"),
      params: {
        icon: :thumbs_up,
        size: :lg
      }
    )
  end
end
