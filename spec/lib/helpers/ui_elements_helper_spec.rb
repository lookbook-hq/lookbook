require "rails_helper"

RSpec.describe Lookbook::UiElementsHelper do
  let(:helper) { Class.new { include Lookbook::UiElementsHelper }.new }

  after { Lookbook::UiElementsHelper::COMPONENT_CLASSES.clear }

  context "#component_class" do
    it "resolves each reference only once" do
      helper.send(:component_class, :tag)
      allow(ActiveSupport::Inflector).to receive(:constantize).and_call_original

      helper.send(:component_class, :tag)
      expect(ActiveSupport::Inflector).not_to have_received(:constantize)
    end

    it "resolves references again after a code reload" do
      helper.send(:component_class, :tag)
      reloaded_class = stub_const("Lookbook::TagComponent", Class.new)
      Rails.application.reloader.prepare!

      expect(helper.send(:component_class, :tag)).to eq reloaded_class
    end
  end
end
