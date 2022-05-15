# @label Toolbar Button Group
class ButtonGroupComponentPreview < ViewComponent::Preview
  def default
    render Lookbook::ButtonGroup::Component.new do |group|
      group.button icon: :book
      group.button icon: :book_open
      group.button icon: :smile
    end
  end
end
