class MultilineTagComponent < ViewComponent::Base
  def initialize(src: nil, **kwargs)
    @src = src
  end
end
