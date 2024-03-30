module Elements
  class ButtonComponent < ViewComponent::Base
    VARIANTS = %i[primary secondary contrast]

    def initialize(variant: :primary)
      @variant = variant
    end
  end
end
