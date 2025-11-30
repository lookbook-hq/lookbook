class Elements::ButtonComponentPreview < ViewComponent::Preview
  # Button playground
  # -----------------------
  # You can use the controls in the 'Params' section
  # to set button property values on the fly.
  #
  # @param text "Content of button"
  # @param theme select "The button action type" :theme_options
  # @param arrow [Boolean] toggle "Show the arrow?"
  def playground(text: "Click me", theme: :danger, arrow: false)
    render Elements::ButtonComponent.new(theme: theme, arrow: arrow) do
      text
    end
  end

  # @!group Themes

  # @label Primary (default)
  # @param text
  def with_default_theme(text: "A primary action")
    render Elements::ButtonComponent.new do
      text
    end
  end

  # @label Secondary
  def with_secondary_theme
    render Elements::ButtonComponent.new(theme: :secondary) do
      "A less important action"
    end
  end

  # @label Danger
  def with_danger_theme
    render Elements::ButtonComponent.new(theme: :danger) do
      "A dangerous action"
    end
  end

  # @!endgroup

  private

  def theme_options
    Elements::ButtonComponent::THEMES
  end
end
