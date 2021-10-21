class BasicComponent < ViewComponent::Base

  def initialize(text = nil)
    @text = text || "basic component"
  end

  def call
    tag.div @text
  end
end