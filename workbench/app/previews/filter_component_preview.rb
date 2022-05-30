# @display max_width 600px
# @display centered true
class FilterComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Filter::Component.new store: "$store.workbench.filter"
  end
end
