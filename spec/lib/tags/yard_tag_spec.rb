require "rails_helper"

RSpec.describe Lookbook::YardTag do
  it "extends YARD's tag class" do
    expect(described_class).to be < ::YARD::Tags::Tag
  end

  context "with no options" do
    let(:tag) { described_class.new(:scenario, "tag body here") }

    context ".text" do
      it "returns the text" do
        expect(tag.text).to eq "tag body here"
      end
    end

    context ".options" do
      it "returns an empty hash" do
        expect(tag.options).to eq({})
      end
    end
  end

  context "with options" do
    let(:tag) { described_class.new(:scenario, "tag body here { foo: 'bar' }") }

    context ".text" do
      it "returns the text" do
        expect(tag.text).to eq "tag body here"
      end
    end

    context ".options" do
      it "parses options using the TagOptionsParser service" do
        expect(Lookbook::TagOptionsParser).to receive(:call).with("tag body here { foo: 'bar' }", anything)
        tag.options
      end

      it "returns the options" do
        expect(tag.options).to eq({foo: "bar"})
      end
    end
  end

  context ".value" do
    let(:tag) { described_class.new(:scenario, "tag body here") }

    it "is an alias for .text" do
      expect(tag.value).to eql tag.text
    end
  end
end
