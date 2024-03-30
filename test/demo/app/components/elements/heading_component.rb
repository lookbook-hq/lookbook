module Elements
  class HeadingComponent < ViewComponent::Base
    SIZES = [*1..6]

    def initialize(size: 1)
      @size = size
    end

    def call
      tag.send(:"h#{@size}") { content }
    end
  end
end
