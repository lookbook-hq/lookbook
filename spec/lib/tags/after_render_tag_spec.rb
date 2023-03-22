require "rails_helper"

RSpec.describe Lookbook::AfterRenderTag do
  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context ".value" do
    it "returns text as-is if it doesn't start with a ':'" do
      tag = described_class.new("my_method")
      expect(tag.value).to eq "my_method"
    end

    it "strips leading ':'" do
      tag = described_class.new(":my_method")
      expect(tag.value).to eq "my_method"
    end
  end
end
