require "rails_helper"

RSpec.describe Lookbook::PreviewParamCoercion do
  describe ".coerce" do
    it "casts raw string values to the declared param type" do
      result = described_class.coerce(ParamsComponentPreview, "coerce_symbol", {"my_param" => "bar"})
      expect(result["my_param"]).to eq(:bar)
    end

    it "leaves already-cast (non-String) values untouched (idempotent)" do
      result = described_class.coerce(ParamsComponentPreview, "coerce_symbol", {"my_param" => :bar})
      expect(result["my_param"]).to eq(:bar)
    end

    it "casts symbol-keyed params and preserves the symbol key" do
      result = described_class.coerce(ParamsComponentPreview, "coerce_symbol", {my_param: "bar"})
      expect(result[:my_param]).to eq(:bar)
    end

    it "passes params through when the preview class is unknown" do
      input = {"my_param" => "bar"}
      expect(described_class.coerce(Class.new, "coerce_symbol", input)).to eq(input)
    end

    it "passes params through for params with no @param tag" do
      result = described_class.coerce(ParamsComponentPreview, "coerce_symbol", {"unknown" => "x"})
      expect(result["unknown"]).to eq("x")
    end

    it "does not raise when casting an invalid value and returns the casted result" do
      result = nil
      # ActiveModel's integer cast coerces a non-numeric string to 0 rather
      # than raising; coercion must not blow up out of render_args either way.
      expect {
        result = described_class.coerce(ParamsComponentPreview, "coerce_mixed", {"num" => "not-a-number"})
      }.not_to raise_error
      expect(result["num"]).to eq(0)
    end
  end
end
