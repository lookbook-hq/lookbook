class FilterComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Filter::Component.new store: "$store.workbench.filter"
  end
end
