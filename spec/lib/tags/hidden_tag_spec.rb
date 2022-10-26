require "rails_helper"

RSpec.describe Lookbook::HiddenTag do
  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context ".value" do
    it "returns true if tag argument is empty" do
      tag = described_class.new
      expect(tag.value).to be true
    end

    it "returns true if tag argument is 'true'" do
      tag = described_class.new("true")
      expect(tag.value).to be true
    end

    it "returns true if tag argument is any other value" do
      ["0", "nope", "yes"].each do |text|
        tag = described_class.new(text)
        expect(tag.value).to be true
      end
    end

    it "returns false if tag argument is 'false'" do
      tag = described_class.new("false")
      expect(tag.value).to be false
    end
  end
end
