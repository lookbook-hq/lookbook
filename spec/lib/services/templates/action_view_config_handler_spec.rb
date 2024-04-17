require "rails_helper"

ANNOTATIONS_SUPPORTED = ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames)
PARTIAL_PREFIX_SUPPORTED = ActionView::Base.respond_to?(:prefix_partial_path_with_controller_namespace)

RSpec.describe Lookbook::ActionViewConfigHandler do
  let(:original_annotations_value) { true }
  let(:original_partial_prefix_value) { true }

  context "with ActionView annotations supported", if: ANNOTATIONS_SUPPORTED do
    before do
      allow(ActionView::Base).to receive(:annotate_rendered_view_with_filenames).and_return(original_annotations_value)
    end

    context "with default values" do
      it "disables annotations" do
        expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(false)

        described_class.call do
          expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(original_annotations_value)
        end
      end
    end

    context "with custom settings" do
      let(:disable_annotations) { true }

      subject { described_class.call(disable_annotations: disable_annotations) {} }

      it "disables annotations" do
        expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(false)

        described_class.call(disable_annotations: disable_annotations) do
          expect(ActionView::Base).to receive(:annotate_rendered_view_with_filenames=).with(original_annotations_value)
        end
      end

      describe "when disable_annotations is false" do
        let(:disable_annotations) { false }

        it "doesn't touch corresponding ActionView::Base constant" do
          expect(ActionView::Base).to_not receive(:annotate_rendered_view_with_filenames=)

          subject
        end
      end
    end
  end

  context "without ActionView annotations supported", if: !ANNOTATIONS_SUPPORTED do
    it "doesn't touch annotate_rendered_view_with_filenames ActionView::Base constant" do
      expect(ActionView::Base).to_not receive(:annotate_rendered_view_with_filenames=)

      described_class.call(disable_annotations: true) {}
    end
  end

  context "with ActionView partial prefix supported", if: PARTIAL_PREFIX_SUPPORTED do
    before do
      allow(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace).and_return(original_partial_prefix_value)
    end

    context "with default values" do
      it "disables partial prefixing" do
        expect(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace=).with(false)

        described_class.call do
          expect(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace=).with(original_partial_prefix_value)
        end
      end
    end

    context "with custom settings" do
      let(:disable_partial_prefixes) { true }
      subject { described_class.call(disable_partial_prefixes: disable_partial_prefixes) {} }

      it "disables partial prefixes" do
        expect(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace=).with(false)

        described_class.call(disable_partial_prefixes: disable_partial_prefixes) do
          expect(ActionView::Base).to receive(:prefix_partial_path_with_controller_namespace=).with(original_partial_prefix_value)
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

  context "without ActionView partial prefix supported", if: !PARTIAL_PREFIX_SUPPORTED do
    it "doesn't touch prefix_partial_path_with_controller_namespace ActionView::Base constant" do
      expect(ActionView::Base).to_not receive(:prefix_partial_path_with_controller_namespace=)

      described_class.call(disable_partial_prefixes: true) {}
    end
  end
end
