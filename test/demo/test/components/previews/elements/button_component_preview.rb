module Elements
  class ButtonComponentPreview < Lookbook::Preview
    def default
      render Elements::ButtonComponent.new do
        "Default button"
      end
    end

    # @!group Variants

    # @label Default (primary)
    def primary
      render Elements::ButtonComponent.new(variant: :primary) do
        "Primary button"
      end
    end

    def secondary
      render Elements::ButtonComponent.new(variant: :secondary) do
        "Secondary button"
      end
    end

    def contrast
      render Elements::ButtonComponent.new(variant: :contrast) do
        "Contrast button"
      end
    end

    # @!endgroup

    # @param label
    # @param variant [Symbol] select :button_variant_choices
    def playground(label: "Click me", variant: :primary)
      render Elements::ButtonComponent.new(variant: variant) do
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