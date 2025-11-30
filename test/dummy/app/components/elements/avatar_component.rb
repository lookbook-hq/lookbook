class Elements::AvatarComponent < ViewComponent::Base
  def initialize(src:, size: :md, square: false)
    @src = src
    @classes = class_names({
      "rounded-lg": square,
      "rounded-full": !square,
      "avatar-sm": size == :sm,
      "avatar-md": size == :md,
      "avatar-lg": size == :lg
    })
  end
end
