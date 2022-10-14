require "rails_helper"

RSpec.describe Lookbook::SearchParamParser do
  it "parses a key-value pair into a hash" do
    params = described_class.call("key:value")

    expect(params[:key]).to eq "value"
  end

  it "parses pairs of pipe-delimited key-value pairs into a hash" do
    params = described_class.call("key_1:value_1|key_2:value 2")

    expect(params[:key_1]).to eq "value_1"
    expect(params[:key_2]).to eq "value 2"
  end

  it "strips spaces from keys and values" do
    params = described_class.call(" key_1 : value_1 | key_2 : value 2 ")

    expect(params[:key_1]).to eq "value_1"
    expect(params[:key_2]).to eq "value 2"
  end
end
