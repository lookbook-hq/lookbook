require "rails_helper"

RSpec.describe Lookbook::ParamsCoercer do
  let(:scenario) { Lookbook::Engine.previews.find_by_preview_class(ParamsComponentPreview).scenario("coerce_mixed") }
  let(:coercer) { described_class.new(scenario) }

  describe "#apply!" do
    it "casts declared params in place" do
      params = {"num" => "42", "flag" => "true"}

      coercer.apply!(params)

      expect(params).to eq({"num" => 42, "flag" => true})
    end

    it "returns a Param for each declared @param tag" do
      params = described_class.new(scenario).apply!({"num" => "42", "flag" => "true"})

      expect(params.map(&:name)).to match_array(%w[num flag sym])
    end

    it "leaves params with no @param tag alone" do
      params = {"num" => "42", "undeclared" => "x"}

      coercer.apply!(params)

      expect(params["undeclared"]).to eq("x")
    end

    it "leaves already-cast values alone, so coercion is idempotent" do
      params = {"num" => "42", "flag" => "true"}

      coercer.apply!(params)
      coercer.apply!(params)

      expect(params).to eq({"num" => 42, "flag" => true})
    end

    it "matches symbol keys and preserves the key type" do
      params = {num: "42"}

      coercer.apply!(params)

      expect(params).to eq({num: 42})
    end

    it "builds no params when the entity is nil" do
      expect(described_class.new(nil).apply!({"num" => "42"})).to be_empty
    end
  end

  describe "#coerce" do
    it "returns a coerced copy, leaving the original untouched" do
      params = {"num" => "42"}

      expect(coercer.coerce(params)).to eq({"num" => 42})
      expect(params).to eq({"num" => "42"})
    end
  end
end
