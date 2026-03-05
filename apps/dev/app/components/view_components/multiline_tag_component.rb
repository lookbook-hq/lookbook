module ViewComponents
  class MultilineTagComponent < ViewComponent::Base
    erb_template <<~ERB
      <img
        src="#{@src}"
        alt="an image" />
    ERB

    def initialize(src: nil, **kwargs)
      @src = src
    end
  end
end
