class ParamsComponentPreview < ViewComponent::Preview
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
  # @param date date
  # @param datetime_local datetime_local
  def all_params(select: "select",
    textarea: "textarea",
    toggle: "toggle",
    color: "color",
    range: "range",
    text: "text",
    email: "email",
    number: "number",
    tel: "tel",
    url: "url",
    date: "date",
    datetime_local: "datetime_local")
    render StandardComponent.new do
      "test for param field rendering"
    end
  end
end
