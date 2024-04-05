module Elements
  # A button component built with `ViewComponent`.
  # This preview uses the `ViewComponent::Preview` base class.
  class HeadingComponentPreview < ViewComponent::Preview
    def default
      render Elements::HeadingComponent.new do
        "A heading"
      end
    end
  end
end
