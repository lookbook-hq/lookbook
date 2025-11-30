# @label Simple list
class Elements::ListComponentPreview < ViewComponent::Preview
  # This example uses the `with_content` helper to set inline content.
  #
  # You can read more about it in the ViewComponent [slots documentation](https://viewcomponent.org/guide/slots.html#with_content).
  def default
    render Elements::ListComponent.new do |list|
      list.with_item.with_content "One"
      list.with_item.with_content "Two"
      list.with_item.with_content "Three"
    end
  end
end
