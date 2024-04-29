module Lookbook
  module UI
    class PreviewEmbed < BaseComponent
      attr_reader :preview, :target, :targets, :panels, :display_options, :display_options_values, :preview_html

      def initialize(preview:, target:, preview_html: nil, targets: [], panels: [], preview_params: {}, display_options: {}, display_options_values: {}, **kwargs)
        @preview = preview
        @target = target
        @targets = targets
        @panels = panels
        @preview_html = preview_html
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
