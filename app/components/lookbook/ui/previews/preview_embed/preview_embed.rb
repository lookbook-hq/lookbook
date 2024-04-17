module Lookbook
  module UI
    class PreviewEmbed < BaseComponent
      attr_reader :preview, :target, :panels, :preview_params

      def initialize(preview:, target:, panels: [], preview_params: {}, **kwargs)
        @preview = preview
        @target = target
        @panels = panels
        @preview_params = preview_params
      end
    end
  end
end
