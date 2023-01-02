RSpec.shared_scenarios "eval resolver" do
  it "is a DataResolver" do
    expect(described_class).to be < Lookbook::DataResolver
  end

  context "default" do
    let(:opts) {
      {
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
