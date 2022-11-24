require "rails_helper"

RSpec.describe Lookbook::SearchParamParser do
  it "parses the input as json" do
    params = described_class.call({key: "value"}.to_json)

    expect(params[:key]).to eq "value"
  end
end
