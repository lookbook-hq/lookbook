class BasicComponent < ViewComponent::Base
  def call
    tag.p { "viewcomponent component" }
  end
end
