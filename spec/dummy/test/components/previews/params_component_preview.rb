class ParamsComponentPreview < ViewComponent::Preview
  TEXT = "the default value"

  # @param select select
  # @param textarea textarea
  # @param toggle toggle
  # @param color color
  # @param range range
  # @param text text
  # @param email email
  # @param number number
  # @param tel tel
  # @param url url
  def all_params(select: "select",
    textarea: "textarea",
    toggle: "toggle",
    color: "color",
    range: "range",
    text: "text",
    email: "email",
    number: "number",
    tel: "tel",
    url: "url")
    render StandardComponent.new do
      "test for param field rendering"
    end
  end

  # @param date date
  # @param datetime datetime-local
  def date_params(date: Date.new(1981, 4, 15), datetime: DateTime.new(1981, 4, 15, 4, 5, 6))
    render StandardComponent.new do
      "test for param field rendering"
    end
  end

  # @param body_text
  def dynamic_args(body_text: TEXT)
    render StandardComponent.new do
      body_text
    end
  end
end
