require "rails_helper"

RSpec.describe Lookbook::DataResolver do
  let(:input) { "input data string" }

  it "raises an exception when called directly" do
    expect { described_class.call(input) }.to raise_error Lookbook::ParserError
  end

  context "fail_silently = true" do
    it "does not raise an exception when called directly" do
      expect { described_class.call(input, fail_silently: true) }.not_to raise_error
    end

    it "returns the fallback after failure" do
      result = described_class.call(input, fail_silently: true, fallback: "fallback_value")
      expect(result).to eq "fallback_value"
    end
  end
end
