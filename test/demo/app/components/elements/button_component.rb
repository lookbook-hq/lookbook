module Elements
  class ButtonComponent < ViewComponent::Base
    VARIANTS = %i[primary secondary contrast]

    def initialize(variant: :primary, arrow: false)
      @variant = variant
      @arrow = arrow
    end
  end
end
