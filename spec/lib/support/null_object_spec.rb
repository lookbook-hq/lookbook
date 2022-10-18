require "rails_helper"

RSpec.describe Lookbook::NullObject do
  context "instance" do
    let(:null_object) { Lookbook::NullObject.new }

    it "responds to any method and returns nil" do
      [:not_a_method, :and_another].each do |method_name|
        expect(null_object.send(method_name)).to be nil

        expect { null_object.send(method_name, "foo") }.not_to raise_error
      end
    end
  end
end
