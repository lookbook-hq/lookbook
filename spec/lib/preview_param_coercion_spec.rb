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

    it "casts scenarios declared inside an @!group" do
      result = described_class.coerce(GroupComponentPreview, "grouped_coerce", {"my_param" => "bar"})
      expect(result["my_param"]).to eq(:bar)
    end

    it "does not consult the preview registry on the render path" do
      allow(Lookbook::Engine).to receive(:previews).and_call_original

      ParamsComponentPreview.render_args("coerce_symbol", params: {"my_param" => "bar"})

      expect(Lookbook::Engine).not_to have_received(:previews)
    end

    context "when a value cannot be cast to the declared type" do
      let(:params) { {"config" => "not-a-yaml-hash"} }

      it "passes the raw value through unchanged" do
        result = described_class.coerce(ParamsComponentPreview, "coerce_hash", params)
        expect(result["config"]).to eq("not-a-yaml-hash")
      end

      it "logs a warning so the misconfiguration is diagnosable" do
        logger = instance_double(Logger, debug: nil, warn: nil)
        allow(Lookbook).to receive(:logger).and_return(logger)

        described_class.coerce(ParamsComponentPreview, "coerce_hash", params)

        expect(logger).to have_received(:warn).with(/Param coercion failed for 'config'/)
      end
    end
  end

  describe ".install" do
    it "is installed on preview classes in the registry" do
      expect(ParamsComponentPreview.singleton_class).to include(described_class)
    end

    it "is not installed on the ViewComponent::Preview base class" do
      expect(ViewComponent::Preview.singleton_class).not_to include(described_class)
    end

    it "is not installed on the Lookbook::Preview base class" do
      expect(Lookbook::Preview.singleton_class).not_to include(described_class)
    end
  end
end
