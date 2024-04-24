module Lookbook
  module UI
    class PreviewInspector < BaseComponent
      attr_reader :preview, :target, :preview_url, :preview_panels, :drawer_panels, :display_options, :display_options_values

      def initialize(preview:, target:, preview_url:, preview_panels: [], drawer_panels: [], display_options: {}, display_options_values: {}, **kwargs)
        @preview = preview
        @target = target
        @preview_url = preview_url
        @preview_panels = preview_panels
        @drawer_panels = drawer_panels
        @display_options = display_options
        @display_options_values = display_options_values
      end
    end
  end
end
