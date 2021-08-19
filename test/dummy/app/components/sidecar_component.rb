class SidecarComponent < ViewComponent::Base
  def call
    tag.div "basic component"
  end
end