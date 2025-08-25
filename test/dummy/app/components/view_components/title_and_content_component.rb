module ViewComponents
  class TitleAndContentComponent < ViewComponent::Base
    def initialize(title: nil, **kwargs)
      @title = title
    end
  end
end
