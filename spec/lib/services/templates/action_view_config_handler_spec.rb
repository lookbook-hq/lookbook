require "rails_helper"

RSpec.describe Lookbook::ActionViewConfigHandler do
  let(:original_annotations_value) { true }
  let(:original_partial_prefix_value) { true }

  before do
    allow(ActionView::Base).to receive(:annotate_rendered_view_with_filenames).and_return(original_annotations_value)
    allow(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace).and_return(original_partial_prefix_value)
  end

  context "with default values" do
    it "disables annotations" do
      expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(false)

      described_class.call do
        expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(original_annotations_value)
      end
    end

    it "doesn't touch partial_prefix ActionView::Base constant" do
      expect(ActionView::Base).to_not receive(:prefix_partial_path_with_controller_namespace=)

      described_class.call {}
    end
  end

  context "with custom settings" do
    let(:disable_annotations) { true }
    let(:disable_partial_prefixes) { true }
    let(:config) {
      {
        disable_annotations: disable_annotations,
        disable_partial_prefixes: disable_partial_prefixes
      }
    }

    subject { described_class.call(**config) {} }

    it "disables annotations" do
      expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(false)

      described_class.call(**config) do
        expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(original_annotations_value)
      end
    end

    it "disables partial prefixes" do
      expect(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace=).with(false)

      described_class.call(**config) do
        expect(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace=).with(original_partial_prefix_value)
      end
    end

    describe "when disable_annotations is false" do
      let(:disable_annotations) { false }

      it "doesn't touch corresponding ActionView::Base constant" do
        expect(ActionView::Base).to_not receive(:annotate_rendered_view_with_filenames=)

        subject
      end
    end

    describe "when disable_partial_prefixes is false" do
      let(:disable_partial_prefixes) { false }

      it "doesn't touch corresponding ActionView::Base constant" do
        expect(ActionView::Base).to_not receive(:prefix_partial_path_with_controller_namespace=)

        subject
      end
    end
  end
end
