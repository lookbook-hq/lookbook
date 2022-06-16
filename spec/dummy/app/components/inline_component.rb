class InlineComponent < ViewComponent::Base

  def call
    tag.div data: {component: "inline"} do
      content
    end
  end
end