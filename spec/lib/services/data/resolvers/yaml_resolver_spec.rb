require "rails_helper"

RSpec.describe Lookbook::YamlResolver do
  let(:valid_input) { "{ foo: bar }" }
  let(:invalid_input) { "{ foo: @sd }" }
  let(:unmatched_input) { "foo: @sd" }

  it "is a DataResolver" do
    expect(described_class).to be < Lookbook::DataResolver
  end

  context "valid input" do
    it "parses YAML" do
      result = described_class.call(valid_input)
      expect(result).to be_a Hash
      expect(result[:foo]).to eq "bar"
    end
  end

  context "invalid input" do
    it "raises an exception" do
      expect { described_class.call(invalid_input) }.to raise_error Lookbook::ParserError
    end
  end

  context "unmatched input" do
    it "raises an exception" do
      expect { described_class.call(unmatched_input) }.to raise_error Lookbook::ParserError
    end
  end
end
