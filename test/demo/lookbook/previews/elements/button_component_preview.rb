module Elements
  # A button component built with `ViewComponent`.
  # This preview uses the `Lookbook::Preview` base class.
  class ButtonComponentPreview < Lookbook::Preview
    def default
      render Elements::ButtonComponent.new do
        "Default button"
      end
    end

    # @!group Variants

    # @label Default (primary)
    # A primary button. Use for the most important actions on the page.
    def primary
      render Elements::ButtonComponent.new(variant: :primary) do
        "Primary button"
      end
    end

    # A button for less important actions.
    def secondary
      render Elements::ButtonComponent.new(variant: :secondary) do
        "Secondary button"
      end
    end

    # Useful for displaying over images or wherever a higher-contrast
    # button option is required.
    def contrast
      render Elements::ButtonComponent.new(variant: :contrast) do
        "Contrast button"
      end
    end

    # @!endgroup

    # @param label
    # @param variant [Symbol] select :button_variant_choices
    # @param arrow "Show/hide arrow icon"
    def playground(label: "Click me", variant: :primary, arrow: false)
      render Elements::ButtonComponent.new(variant: variant, arrow: arrow) do
        label
      end
    end

    private

    def button_variant_choices
      {
        choices: Elements::ButtonComponent::VARIANTS
      }
    end
  end
end
