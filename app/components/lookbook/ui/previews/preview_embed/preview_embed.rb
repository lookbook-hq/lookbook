module Lookbook
  module UI
    class PreviewEmbed < BaseComponent
      attr_reader :preview, :target, :targets, :panels

      def initialize(preview:, target:, targets: [], panels: [], preview_params: {}, **kwargs)
        @preview = preview
        @target = target
        @targets = targets
        @panels = panels
        @preview_params = preview_params
      end

      def preview_params
        @preview_params.merge({
          _lookbook_embed: true
        })
      end
    end
  end
end
