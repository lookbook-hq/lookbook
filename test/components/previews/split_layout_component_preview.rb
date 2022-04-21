class SplitLayoutComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::SplitLayout::Component.new do |panes|
      panes.pane do
        "Pane One"
      end
      panes.pane do
        "Pane Two"
      end
    end
  end

  def another
    render Lookbook::SplitLayout::Component.new do |panes|
      panes.pane do
        "Pane One"
      end
      panes.pane do
        "Pane Two"
      end
    end
  end
end
