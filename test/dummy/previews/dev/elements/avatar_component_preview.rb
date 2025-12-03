# Avatar component
# ----------------
#
# The avatar component is great for tiny faces.
#
# Also good for:
#
# 1. **Tiny logos**
# 1. Other tiny things
#
class Elements::AvatarComponentPreview < ViewComponent::Preview
  # Default avatar
  # ----------------
  #
  # @label Rounded
  # @param src "The avatar source image URL"
  # @param size [Symbol] select "The size to display the avatar at." { choices: [[Small, sm], [Medium, md], [Large, lg]] }
  def default(size: :md, src: "https://placehold.co/400x400")
    render Elements::AvatarComponent.new(src: src, size: size)
  end

  # @label Square
  #
  # @param (see #default)
  def format_square(src: "https://placehold.co/400x400", size: :md)
    render Elements::AvatarComponent.new(src: src, size: size, square: true)
  end
end
