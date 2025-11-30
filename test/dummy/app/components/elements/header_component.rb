class Elements::HeaderComponent < ViewComponent::Base
  def initialize(size: 30)
    @size = size
  end

  def call
    tag.h1 content, style: "font-size: #{@size}px; font-weight: bold; text-decoration: underline"
  end
end
