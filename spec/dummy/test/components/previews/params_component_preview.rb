class ParamsComponentPreview < ViewComponent::Preview
  TEXT = <<~TEXT
    the multiline

    default value
  TEXT

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

  # @param body_text textarea
  def dynamic_args(body_text: TEXT)
    render StandardComponent.new do
      body_text
    end
  end

  # @param my_param [Symbol] select [foo, bar]
  def coerce_symbol(my_param: :foo)
    render StandardComponent.new do
      "my_param=#{my_param} class=#{my_param.class}"
    end
  end

  # @param config [Hash] textarea
  def coerce_hash(config: {})
    render StandardComponent.new do
      "config=#{config.class}"
    end
  end

  # @param sym [Symbol] select [foo, bar]
  # @param flag [Boolean] toggle
  # @param num number
  def coerce_mixed(sym: :foo, flag: false, num: 1)
    render StandardComponent.new do
      "sym=#{sym.class} flag=#{flag.class} num=#{num.class}"
    end
  end
end
