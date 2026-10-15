require "rails_helper"

RSpec.describe Lookbook::ParamsCoercer do
  let(:preview) { Lookbook::Engine.previews.find_by_preview_class(ParamsComponentPreview) }
  let(:scenario) { preview.scenario("coerce_mixed") }
  let(:coercer) { described_class.new(scenario) }

  def tag_double(name:, value_type: nil, input: nil, default: nil)
    instance_double(Lookbook::ParamTag,
      name: name, input: input, description: nil, value_type: value_type,
      options: Lookbook::Store.new, value_default: default)
  end

  def entity_with_tags(*tags)
    instance_double(Lookbook::ScenarioEntity).tap do |entity|
      allow(entity).to receive(:tags).with("param").and_return(tags)
    end
  end

  describe "#params_list" do
    it "returns a Param for each declared @param tag, holding the raw value" do
      params = coercer.params_list({"num" => "42", "flag" => "true"})

      expect(params.map(&:name)).to match_array(%w[num flag sym])
      expect(params.find { |p| p.name == "num" }.value).to eq("42")
    end

    it "builds no params when the entity is nil" do
      expect(described_class.new(nil).params_list({"num" => "42"})).to be_empty
    end
  end

  describe "#cast!" do
    it "casts declared params in place and returns the supplied params object" do
      params = {"num" => "42", "flag" => "true"}

      expect(coercer.cast!(params)).to be(params)
      expect(params).to eq({"num" => 42, "flag" => true})
    end

    it "leaves params with no @param tag alone" do
      params = coercer.cast!({"num" => "42", "undeclared" => "x"})

      expect(params["undeclared"]).to eq("x")
    end

    it "leaves already-cast values alone, so coercion is idempotent" do
      params = {"num" => "42", "flag" => "true"}

      coercer.cast!(params)
      coercer.cast!(params)

      expect(params).to eq({"num" => 42, "flag" => true})
    end

    it "matches symbol keys and preserves the key type" do
      expect(coercer.cast!({num: "42"})).to eq({num: 42})
    end

    it "casts an empty string to nil, as the UI path always has" do
      expect(coercer.cast!({"num" => ""})).to eq({"num" => nil})
    end

    it "infers the type from the default when the tag declares none" do
      inferred = described_class.new(preview.scenario("coerce_inferred"))

      expect(inferred.cast!({"my_param" => "bar"})).to eq({"my_param" => :bar})
    end

    it "does not evaluate a real scenario default when the tag declares a type" do
      counted = described_class.new(preview.scenario("coerce_counted"))

      expect { counted.cast!({"num" => "42"}) }
        .not_to change(ParamsComponentPreview, :default_evaluations)
    end

    it "shares one evaluation of an inferred default between params_list, cast! and the UI" do
      counted = described_class.new(preview.scenario("coerce_counted_string"))
      params = {"label" => "x"}

      expect {
        list = counted.params_list(params)
        counted.cast!(params)
        list.each(&:value_default)
      }.to change(ParamsComponentPreview, :string_default_evaluations).by(1)
      expect(params).to eq({"label" => "x"})
    end

    it "does not evaluate defaults when the tag declares a type (unit)" do
      tag = tag_double(name: "num", value_type: "integer")

      described_class.new(entity_with_tags(tag)).cast!({"num" => "42"})

      expect(tag).not_to have_received(:value_default)
    end

    it "does not evaluate defaults for params that were not provided" do
      tag = tag_double(name: "num")

      described_class.new(entity_with_tags(tag)).cast!({"other" => "x"})

      expect(tag).not_to have_received(:value_default)
    end

    it "warns and passes the value through when type inference raises" do
      tag = tag_double(name: "num")
      allow(tag).to receive(:value_default).and_raise(NoMethodError, "undefined method 'start_with?' for nil")
      logger = instance_double(Logger, debug: nil, warn: nil)
      allow(Lookbook).to receive(:logger).and_return(logger)

      params = described_class.new(entity_with_tags(tag)).cast!({"num" => "42"})

      expect(params).to eq({"num" => "42"})
      expect(logger).to have_received(:warn).with(/Param coercion failed for 'num'/)
    end
  end

  describe "#cast" do
    it "returns a coerced copy, leaving the original untouched" do
      params = {"num" => "42"}

      expect(coercer.cast(params)).to eq({"num" => 42})
      expect(params).to eq({"num" => "42"})
    end
  end
end
