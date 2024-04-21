module Lookbook
  module UI
    class PreviewOverview < BaseComponent
      attr_reader :id, :preview, :targets

      def initialize(preview:, targets: [], id: "preview-overview", **kwargs)
        @id = id
        @preview = preview
        @targets = targets
      end

      def breadcrumbs = [preview.ancestors, preview].flatten
    end
  end
end
