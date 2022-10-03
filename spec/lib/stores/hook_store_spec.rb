require "rails_helper"

RSpec.describe Lookbook::HookStore do
  context "instance" do
    let(:config) { Lookbook::HookStore.new }

    before do
      config = Lookbook::HookStore.new # standard:disable Lint/UselessAssignment
    end

    context ".add_hook" do
      it "adds a hook for the specified event" do
        callback = proc { puts "hook callback" }
        config.add_hook(:event_name, callback)

        expect(config.for_event(:event_name).size).to be 1
        expect(callback).to receive(:call)

        config.for_event(:event_name).first.call
      end
    end
  end
end
