class DebugMenuComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::DebugMenu::Component.new version: "101.1.1",
      repo_url: "https://github.com/ViewComponent/lookbook",
      docs_url: "https://lookbook.build" do
        "Some debug data here"
      end
  end
end
