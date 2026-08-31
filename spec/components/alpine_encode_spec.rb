require "rails_helper"

# `BaseComponent#alpine_encode` serialises data into Alpine `x-data`
# attributes. These specs pin down that a hostile display-option value or
# preview param value cannot break out of the JS string literal and inject an
# arbitrary Alpine expression — the XSS class fixed in #668 and #801.
#
# The check mirrors what a browser + Alpine actually do: read the rendered
# attribute, decode HTML entities once (as the parser does before Alpine sees
# the value), then require the `{name, value}` argument to be valid JSON whose
# `value` is exactly the original input. If a payload broke out, the argument
# would fail to parse.
RSpec.describe "Alpine x-data escaping", type: :component do
  let(:entities) { {"amp" => "&", "quot" => '"', "lt" => "<", "gt" => ">", "#39" => "'", "#x27" => "'"} }

  # Decode HTML character references in a single pass, like the HTML parser.
  def decode_entities(string)
    string.gsub(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/) do
      name = $1
      next entities[name] if entities.key?(name)
      next [$1.to_i(16)].pack("U") if name =~ /\A#x([0-9a-fA-F]+)\z/
      next [$1.to_i].pack("U") if name =~ /\A#(\d+)\z/
      "&#{name};"
    end
  end

  def x_data(html)
    html[/x-data="([^"]*)"/, 1] || html[/x-data='([^']*)'/, 1]
  end

  def encoded_argument(html)
    decoded = decode_entities(x_data(html).to_s)
    JSON.parse(decoded[/\((\{.*\})\)/, 1])
  end

  # Each of these tries to close the JS string and append an expression.
  hostile_values = {
    "a single quote" => %(x'}, alerted = true, z: {a: '),
    "a double quote" => %(x"}, alerted = true, z: {a: "),
    "both quote styles" => %(a'b"}, alerted = true, c: "),
    "a trailing backslash" => "back\\",
    "a backslash then quote" => %(\\"),
    "an HTML/script fragment" => %(</script><img src=x onerror=alert(1)>),
    "a JS line separator" => "line break",
    "a newline" => "line1\nline2",
    "an ordinary value" => "primary"
  }

  describe "display options field (#801)" do
    hostile_values.each do |description, value|
      it "safely encodes #{description}" do
        html = render_inline(
          Lookbook::DisplayOptions::Field::Component.new(name: "theme", opts: ["a", "b"], value: value)
        ).to_html

        expect(encoded_argument(html)).to eq("name" => "theme", "value" => value)
      end
    end
  end

  describe "preview params field (#668)" do
    hostile_values.each do |description, value|
      it "safely encodes #{description}" do
        param = Lookbook::Param.new(name: "theme", input: "text", value: value, value_type: "string", options: Lookbook::Store.new({}))
        html = render_inline(Lookbook::Params::Field::Component.new(param: param, index: 0)).to_html

        expect(encoded_argument(html)).to eq("name" => "theme", "value" => value)
      end
    end
  end
end
