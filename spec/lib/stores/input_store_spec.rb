require "rails_helper"

RSpec.describe Lookbook::InputStore do
  context "instance" do
    let(:config) { Lookbook::InputStore.new }

    before do
      config = Lookbook::InputStore.new # standard:disable Lint/UselessAssignment
    end

    context ".add_input" do
      context "with no partial path" do
        it "raises an exception" do
          expect { config.add_input(:panel_name) }.to raise_error Lookbook::ConfigError
          expect { config.add_input(:panel_name, {foo: "bar"}) }.to raise_error Lookbook::ConfigError
        end
      end

      context "with partial path" do
        it "adds the input" do
          config.add_input(:input_name, "path/to/partial")
          scenario = config.get_input(:input_name)

          expect(scenario).to_not be nil
          expect(scenario.name).to eql :input_name
          expect(scenario.options).to be_a Hash
          expect(scenario.options.blank?).to be true
        end

        it "adds the input with opts" do
          opts = {rows: 2}
          config.add_input(:input_name, "path/to/partial", opts)
          scenario = config.get_input(:input_name)

          expect(scenario).to_not be nil
          expect(scenario.name).to eql :input_name
          expect(scenario.options).to include(opts)
        end
      end
    end
  end
end
