class Feedback::AlertComponent < ViewComponent::Base
  def initialize(message:, style: :warn)
    @message = message
    @style = style
  end
end
