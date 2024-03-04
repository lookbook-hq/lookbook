module Lookbook
  module UI
    class PreviewOverview < BaseComponent
      attr_reader :id, :preview, :targets

      def initialize(preview:, targets: [], id: "preview-overview", **kwargs)
        @id = id
        @preview = preview
        @targets = targets
      end
    end
  end
end
