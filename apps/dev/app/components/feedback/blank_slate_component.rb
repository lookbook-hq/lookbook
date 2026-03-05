class Feedback::BlankSlateComponent < ViewComponent::Base
  renders_one :action, Elements::ButtonComponent
  renders_one :title

  def initialize(with_icon: true)
    @with_icon = with_icon
  end
end
