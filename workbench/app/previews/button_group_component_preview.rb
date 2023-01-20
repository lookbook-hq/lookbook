# @label Toolbar Button Group
class ButtonGroupComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::ButtonGroup::Component.new do |group|
      group.with_button icon: :book
      group.with_button icon: :book_open
      group.with_button icon: :smile
    end
  end
end
