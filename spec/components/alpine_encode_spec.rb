require "rails_helper"

# `BaseComponent#alpine_encode` serialises data into Alpine `x-data`
# attributes. These specs pin down that a hostile display-option value or
# preview param value cannot break out of the JS string literal and inject an
# arbitrary Alpine expression — the XSS class fixed in #668 and #801.
#
# Reading the attribute through the parsed node gives the decoded value exactly
# as Alpine would see it (entities resolved, whichever quote delimiter Rails
# picked), so we can require the `{name, value}` argument to be valid JSON whose
# `value` is exactly the original input. A payload that broke out would not
# parse.
RSpec.describe "Alpine x-data escaping", type: :component do
  def alpine_argument(rendered, component)
    node = rendered.css("[x-data]").find { |n| n["x-data"].to_s.start_with?("#{component}(") }
    JSON.parse(node["x-data"][/\((\{.*\})\)/, 1])
  end

  # Each of these tries to close the JS string and append an expression.
  hostile_values = {
    "a single quote" => %(x'}, alerted = true, z: {a: '),
    "a double quote" => %(x"}, alerted = true, z: {a: "),
    "both quote styles" => %(a'b"}, alerted = true, c: "),
    "a trailing backslash" => "back\\",
    "a backslash then quote" => %(\\"),
    "an HTML/script fragment" => %(</script><img src=x onerror=alert(1)>),
    "a JS line separator" => "line break",
    "a newline" => "line1\nline2",
    "an ordinary value" => "primary"
  }

  describe "display options field (#801)" do
    hostile_values.each do |description, value|
      it "safely encodes #{description}" do
        rendered = render_inline(
          Lookbook::DisplayOptions::Field::Component.new(name: "theme", opts: ["a", "b"], value: value)
        )

        expect(alpine_argument(rendered, "displayOptionsFieldComponent")).to eq("name" => "theme", "value" => value)
      end
    end
  end

  describe "preview params field (#668)" do
    hostile_values.each do |description, value|
      it "safely encodes #{description}" do
        param = Lookbook::Param.new(name: "theme", input: "text", value: value, value_type: "string", options: Lookbook::Store.new({}))
        rendered = render_inline(Lookbook::Params::Field::Component.new(param: param, index: 0))

        expect(alpine_argument(rendered, "paramsInputComponent")).to eq("name" => "theme", "value" => value)
      end
    end
  end
end
