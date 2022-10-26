require "rails_helper"

RSpec.describe Lookbook::StringValueCaster do
  context "invalid type provided" do
    it "raises an exception" do
      expect { described_class.call("input", :foo) }.to raise_error ArgumentError
    end
  end

  context "cast to string" do
    it "casts the value to a string" do
      expect(described_class.call(1, :string)).to eq "1"
      expect(described_class.call(DateTime.now, :string)).to eq DateTime.now.to_s
      expect(described_class.call("a string", :string)).to eq "a string"
    end
  end

  context "cast to symbol" do
    it "casts the value to a symbol" do
      expect(described_class.call("thing_name", :symbol)).to eq :thing_name
      expect(described_class.call(":thing_name", :symbol)).to eq :thing_name
    end
  end

  context "cast to hash" do
    it "casts the value to a hash" do
      result = described_class.call("{ foo: 'bar' }", :hash)
      expect(result).to be_a Hash
      expect(result[:foo]).to eq "bar"
    end

    it "raises an exception if the cast fails" do
      expect { described_class.call("{ foo: 'bar", :hash) }.to raise_error Psych::SyntaxError
    end

    it "raises an exception if the return value is not a hash" do
      expect { described_class.call("[one, two]", :hash) }.to raise_error Lookbook::ParserError
    end
  end

  context "cast to array" do
    it "casts the value to an array" do
      result = described_class.call("[one, two]", :array)
      expect(result).to match_array ["one", "two"]
    end

    it "raises an exception if the cast fails" do
      expect { described_class.call("[ one, ", :array) }.to raise_error Psych::SyntaxError
    end

    it "raises an exception if the return value is not an array" do
      expect { described_class.call("foo", :array) }.to raise_error Lookbook::ParserError
    end
  end

  context "cast to datetime" do
    it "casts the value to a datetime" do
      expect(described_class.call("1981-04-15", :datetime)).to be_a DateTime
    end

    it "raises an exception if the cast fails" do
      expect { described_class.call("#fail", :datetime) }.to raise_error Date::Error
    end
  end

  context "cast to boolean" do
    it "casts the value to a boolean" do
      expect(described_class.call("true", :boolean)).to be true
      expect(described_class.call("false", :boolean)).to be false
      expect(described_class.call("anything", :boolean)).to be true
    end
  end

  context "cast to integer" do
    it "casts the value to an integer" do
      expect(described_class.call("123", :integer)).to eq 123
      expect(described_class.call("123.456", :integer)).to be 123
      expect(described_class.call("#fail", :integer)).to be 0
    end
  end

  context "cast to float" do
    it "casts the value to a float" do
      expect(described_class.call("123", :float)).to eq 123.0
      expect(described_class.call("123.456", :float)).to be 123.456
      expect(described_class.call("#fail", :float)).to be 0.0
    end
  end
end
