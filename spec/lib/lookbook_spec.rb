require "rails_helper"

RSpec.describe Lookbook do
  context ".data" do
    it "returns a Store instance" do
      expect(Lookbook.data).to be_a Lookbook::Store
    end
  end

  context ".data=" do
    it "overrides the existing data" do
      Lookbook.data.old_prop = true
      Lookbook.data = {
        new_prop: true
      }
      expect(Lookbook.data).to be_a Lookbook::Store
      expect(Lookbook.data.old_prop).to be nil
      expect(Lookbook.data.new_prop).to be true
    end
  end
end
