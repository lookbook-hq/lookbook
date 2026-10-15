require "rails_helper"

RSpec.describe Lookbook::Param do
  def tag_double(value_type: nil, input: nil, default: :foo)
    instance_double(Lookbook::ParamTag,
      name: "my_param",
      input: input,
      description: nil,
      value_type: value_type,
      options: Lookbook::Store.new,
      value_default: default)
  end

  describe ".from_tag" do
    it "does not evaluate the tag's default when the value type is declared" do
      tag = tag_double(value_type: "symbol")

      param = described_class.from_tag(tag, value: "bar")
      param.cast_value

      expect(tag).not_to have_received(:value_default)
    end

    it "does not evaluate the tag's default for a number input" do
      tag = tag_double(input: "number")

      param = described_class.from_tag(tag, value: "42")

      expect(param.cast_value).to eq(42)
      expect(tag).not_to have_received(:value_default)
    end

    it "evaluates the default once when a select input needs it for type inference" do
      tag = tag_double(input: "select", default: :foo)

      param = described_class.from_tag(tag, value: "bar")
      expect(param.cast_value).to eq(:bar)
      expect(param.value_default).to eq(:foo)

      expect(tag).to have_received(:value_default).once
    end

    it "falls back to the default for #value when no value is given" do
      param = described_class.from_tag(tag_double(default: :foo))

      expect(param.value).to eq(:foo)
    end
  end
end
