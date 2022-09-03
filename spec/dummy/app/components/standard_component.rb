class StandardComponent < ViewComponent::Base
  def initialize(title: nil)
    @title = title
  end
end