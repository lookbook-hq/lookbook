class Navigation::NavbarComponent < ViewComponent::Base
  renders_one :avatar, ->(**attrs) do
    attrs[:size] = :sm
    Elements::AvatarComponent.new(**attrs)
  end

  def initialize(links: [])
    @links = links
  end
end