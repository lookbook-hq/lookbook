require "rails_helper"

RSpec.describe Lookbook do
  context ".data" do
    it "can have arbitrary properties set on it" do
      expect(Lookbook.data.foo).to be nil
      Lookbook.data.foo = "bar"
      expect(Lookbook.data.foo).to eq "bar"
    end

    it "can have values accessed by hash notation with string keys" do
      Lookbook.data.test_hash_notation_string_keys = "working"
      expect(Lookbook.data["test_hash_notation_string_keys"]).to eq "working"

      Lookbook.data[:test_hash_notation_string_keys] = "working as well"
      expect(Lookbook.data["test_hash_notation_string_keys"]).to eq "working as well"
    end

    it "can have values accessed by hash notation with symbol keys" do
      Lookbook.data.test_hash_notation_symbol_keys = "working"
      expect(Lookbook.data[:test_hash_notation_symbol_keys]).to eq "working"

      Lookbook.data["test_hash_notation_symbol_keys"] = "working as well"
      expect(Lookbook.data[:test_hash_notation_symbol_keys]).to eq "working as well"
    end
  end

  context ".data=" do
    it "overrides the existing data" do
      Lookbook.data.old_prop = true
      Lookbook.data = {
        new_prop: true
      }
      expect(Lookbook.data.old_prop).to be nil
      expect(Lookbook.data.new_prop).to be true
    end
  end
end
