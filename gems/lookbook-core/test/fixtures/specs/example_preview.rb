# Class-level notes
# -----------------
#
# General notes about the spec _subject_.
#
# @hidden true
# @display text green
class ExamplePreview < ViewComponent::Preview
  ICON_PARAM_OPTIONS = {
    label: "Example icon"
  }

  # Notes specific to the _default_ scenario.
  def default
    render ExampleComponent.new
  end

  # Notes specific to the _with notes_ scenario.
  def with_notes
    render ExampleComponent.new(size: :small)
  end

  def no_notes
    # No notes for this scenario
    render ExampleComponent.new(size: :large)
  end

  # Tag parsing tests example
  # -------------------------
  #
  # @hidden true
  # @display text white
  # @display attrs {class_name: "bg-pink", id: "root"}
  # @label Tags Example
  #
  # @param name
  # @param text "The text to display"
  # @param size [Symbol] select { choices: [small, medium, large] }
  # @param theme [Symbol] select :theme_options
  # @param icon [Boolean] checkbox {{ ICON_PARAM_OPTIONS }}
  def with_tags(
    name:,
    text: default_text_provider,
    size: :medium,
    theme: "sparkly",
    icon: false
  )
    render ExampleComponent.new(name:, text:, size:, theme:)
  end

  private

  def not_a_scenario
  end

  def theme_options
    {
      choices: [
        ["Default", "sparkly"],
        ["Rainbow", "multicolor"],
        ["Plain", nil]
      ]
    }
  end

  def default_text_provider
    "default text"
  end
end
