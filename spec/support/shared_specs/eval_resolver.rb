RSpec.shared_examples "eval resolver" do
  it "is a DataResolver" do
    expect(described_class).to be < Lookbook::DataResolver
  end

  context "default (eval not permitted)" do
    it "raises an exception" do
      expect { described_class.call(valid_input) }.to raise_error Lookbook::ParserError
    end

    context "fail_silently = true" do
      it "does not raise an exception" do
        expect { described_class.call(invalid_input, fail_silently: true) }.not_to raise_error
      end

      it "returns the fallback after failure" do
        result = described_class.call(valid_input, fail_silently: true, fallback: "fallback_value")
        expect(result).to eq "fallback_value"
      end
    end
  end

  context "eval permitted" do
    let(:opts) {
      {
        permit_eval: true,
        eval_context: EvalResolverContext.new
      }
    }

    context "valid input" do
      it "evaluates the input in the provided context" do
        result = described_class.call(valid_input, **opts)
        expect(result).to be_a Hash
        expect(result[:foo]).to eq "bar"
      end
    end

    context "invalid input" do
      it "raises an exception" do
        expect { described_class.call(invalid_input, **opts) }.to raise_error Lookbook::ParserError
      end
    end

    context "fail_silently = true" do
      it "does not raise an exception" do
        expect { described_class.call(invalid_input, **opts, fail_silently: true) }.not_to raise_error
      end

      it "returns the fallback after failure" do
        result = described_class.call(invalid_input, **opts, fail_silently: true, fallback: "fallback_value")
        expect(result).to eq "fallback_value"
      end
    end
  end

  # standard:disable Lint/ConstantDefinitionInBlock
  class EvalResolverContext
    def get_data
      {foo: "bar"}
    end
  end
  # standard:enable Lint/ConstantDefinitionInBlock
end
