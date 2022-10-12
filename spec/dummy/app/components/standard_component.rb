class StandardComponent < ViewComponent::Base
  def initialize(title: nil, **kwargs)
    @title = title
  end
end
