class Feedback::AlertComponentPreview < Lookbook::Preview
  # Warning alert
  # --------------
  # Used to notify users about some potentially hard-to-undo consequences to an action.
  #
  # **Don't use this for form validation errors!** Use the form-specific messaging component instead.
  def warning
  end

  # Success alert
  # --------------
  # Used to notify users that a successful action has taken place.
  def success
    render Feedback::AlertComponent.new(message: "That was successful", style: :success)
  end

  # Danger alert
  # --------------
  # Used to notify users that something bad has happened.
  def danger
    render Feedback::AlertComponent.new(message: "That was bad", style: :danger)
  end
end
