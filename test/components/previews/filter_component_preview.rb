class FilterComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::Filter::Component.new
  end
end
