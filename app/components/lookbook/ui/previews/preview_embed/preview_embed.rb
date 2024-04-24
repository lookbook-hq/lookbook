module Lookbook
  module UI
    class PreviewEmbed < BaseComponent
      attr_reader :preview, :target, :targets, :panels, :display_options, :display_options_values

      def initialize(preview:, target:, targets: [], panels: [], preview_params: {}, display_options: {}, display_options_values: {}, **kwargs)
        @preview = preview
        @target = target
        @targets = targets
        @panels = panels
        @preview_params = preview_params
        @display_options = display_options
        @display_options_values = display_options_values
      end

      def preview_params
        @preview_params.merge({
          _lookbook_embed: true
        })
      end
    end
  end
end
