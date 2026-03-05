class Elements::ButtonComponent < ViewComponent::Base
  THEMES = %i[primary secondary danger].freeze

  def initialize(theme: :default, arrow: false)
    @theme = theme
    @arrow = arrow
  end

  def theme_class
    case @theme
    when :danger
      "button-danger"
    when :secondary
      "button-secondary"
    end
  end
end
