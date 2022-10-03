require "rails_helper"

RSpec.describe Lookbook::Store do
  it "accepts a hash as default data" do
    store = described_class.new({
      data: true
    })
    expect(store.data).to be true
  end

  it "does not recursively convert hashes to Stores" do
    store = described_class.new({
      data: {
        nested_data: true
      }
    })
    expect(store.data).to be_a Hash
    expect { store.data.nested_data }.to raise_error NoMethodError
    expect(store.data[:nested_data]).to be true
  end

  it "recursively converts hashes to Stores if `recursive` option is true" do
    store = described_class.new({
      data: {
        nested_data: true
      }
    }, recursive: true)
    expect(store.data).to be_a described_class
    expect(store.data.nested_data).to be true
  end

  context "property values" do
    let(:store) { described_class.new }

    it "can accessed with dot notation" do
      store.foo = "bar"
      expect(store.foo).to eq "bar"
    end

    it "can be accessed with hash notation with string keys" do
      store.test_hash_notation_string_keys = "working"
      expect(store["test_hash_notation_string_keys"]).to eq "working"

      store[:test_hash_notation_string_keys] = "working as well"
      expect(store["test_hash_notation_string_keys"]).to eq "working as well"
    end

    it "can be accessed with hash notation with symbol keys" do
      store.test_hash_notation_symbol_keys = "working"
      expect(store[:test_hash_notation_symbol_keys]).to eq "working"

      store["test_hash_notation_symbol_keys"] = "working as well"
      expect(store[:test_hash_notation_symbol_keys]).to eq "working as well"
    end

    it "can accessed via .fetch" do
      store.fetch_me = true
      expect(store.fetch(:fetch_me)).to be true
      expect(store.fetch("fetch_me")).to be true
      expect(store.fetch("not_me", "oops")).to eql "oops"
    end
  end

  context "getters and setters" do
    let(:store) do
      Lookbook::Store.new({
        do_this: true,
        dont_do_this: false,
        done: false
      })
    end

    it "calls getters if present" do
      store.define_singleton_method(:do_that) { "Do this: #{do_this}" }

      expect(store.do_that).to eq "Do this: true"
    end

    it "calls setters if present" do
      store.define_singleton_method(:done=) do |value|
        self[:done] = value == "yes"
      end

      store.done = "no"
      expect(store.done).to eq false

      store.done = "yes"
      expect(store.done).to eq true
    end
  end
end
