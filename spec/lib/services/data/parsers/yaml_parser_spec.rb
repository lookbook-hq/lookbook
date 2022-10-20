require "rails_helper"

RSpec.describe Lookbook::YamlParser do
  let(:valid_input) { "{ foo: bar }" }
  let(:invalid_input) { "{ foo: " }

  it "is a DataParser" do
    expect(described_class).to be < Lookbook::DataParser
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
      expect { described_class.call(invalid_input) }.to raise_error Psych::SyntaxError
    end
  end
end
