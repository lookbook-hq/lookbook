require "rails_helper"

RSpec.describe Lookbook::CustomTag do
  let(:tag_store) { Lookbook::Engine.tags }
  let(:tag_definition) do
    Lookbook::Store.new({
      name: :foo,
      options: {
        named_args: [:arg_1, :arg_2, :arg_3]
      }
    })
  end

  it "extends Lookbook::YardTag" do
    expect(described_class).to be < Lookbook::YardTag
  end

  context "unknown tag name" do
    it "raises an exception" do
      expect { described_class.new(:oops, "arg_1_value") }.to raise_error Lookbook::ParserError
    end
  end

  context "with single argument" do
    it "correctly parses a single unquoted argument" do
      expect(tag_store).to receive(:get_tag).with(:foo).and_return(tag_definition)

      tag = described_class.new(:foo, "arg_1_value")

      expect(tag.arg_1).to eq "arg_1_value"
      expect(tag.arg_2).to eq nil
      expect(tag.arg_3).to eq nil
    end

    it "correctly parses a single quoted argument" do
      expect(tag_store).to receive(:get_tag).with(:foo).and_return(tag_definition)

      tag = described_class.new(:foo, "\"arg_1_value\"")

      expect(tag.arg_1).to eq "arg_1_value"
      expect(tag.arg_2).to eq nil
      expect(tag.arg_3).to eq nil
    end
  end

  context "mix of quoted and unquoted arguments" do
    it "correctly parses the arguments" do
      expect(tag_store).to receive(:get_tag).with(:foo).and_return(tag_definition)

      tag = described_class.new(:foo, " arg_1_value \"arg 2 value\" arg_3_value ")

      expect(tag.arg_1).to eq "arg_1_value"
      expect(tag.arg_2).to eq "arg 2 value"
      expect(tag.arg_3).to eq "arg_3_value"
    end

    it "identifies the options" do
      expect(tag_store).to receive(:get_tag).with(:foo).and_return(tag_definition)

      tag = described_class.new(:foo, " arg_1_value \"arg 2 value\" { option_1: option 1 value }")

      expect(tag.options.option_1).to eq "option 1 value"
    end
  end

  context "custom parse handler" do
    it "receives the tag object as an argument" do
      handler = ->(tag) { tag.foo = "bar" }

      expect(tag_store).to receive(:get_tag).with(:foo).and_return(Lookbook::Store.new({
        name: :foo,
        options: {
          named_args: [:arg_1, :arg_2, :arg_3],
          after_parse: handler
        }
      }))

      expect(handler).to receive(:call).and_call_original

      tag = described_class.new(:foo, "arg_1_value")

      expect(tag.foo).to eq "bar"
    end
  end

  context "setting attributes" do
    it "supports setting arbitrary attributes on the tag instance" do
      expect(tag_store).to receive(:get_tag).with(:foo).and_return(tag_definition)

      tag = described_class.new(:foo)

      expect { tag.foo }.not_to raise_error
      expect(tag.foo).to eq nil

      tag.foo = "bar"

      expect(tag.foo).to eq "bar"
    end
  end

  context "retrieving arguments" do
    it "can also be done via hash syntax" do
      expect(tag_store).to receive(:get_tag).with(:foo).and_return(tag_definition)

      tag = described_class.new(:foo)

      tag.foo = "bar"
      tag.baz = "boop"

      expect(tag[:foo]).to eq "bar"
      expect(tag["baz"]).to eq "boop"
    end
  end
end
