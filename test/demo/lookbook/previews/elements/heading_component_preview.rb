module Elements
  # A button component built with `ViewComponent`.
  # This preview uses the `ViewComponent::Preview` base class.
  class HeadingComponentPreview < ViewComponent::Preview
    def default
      render Elements::HeadingComponent.new do
        "A heading"
      end
    end

    # @!group Sizes

    def heading_1
      render Elements::HeadingComponent.new(size: 1) do
        "A heading"
      end
    end

    def heading_2
      render Elements::HeadingComponent.new(size: 2) do
        "A heading"
      end
    end

    def heading_3
      render Elements::HeadingComponent.new(size: 3) do
        "A heading"
      end
    end
  end
end
