module Lookbook
  module UI
    class PreviewInspector < BaseComponent
      PANEL_COMPONENTS = {
        default: "Lookbook::UI::DefaultPanel",
        code: "Lookbook::UI::CodePanel",
        prose: "Lookbook::UI::ProsePanel",
        params: "Lookbook::UI::ParamsPanel"
      }

      attr_reader :preview, :target, :preview_panels, :drawer_panels

      def initialize(preview:, target:, preview_panels: [], drawer_panels: [], **kwargs)
        @preview = preview
        @target = target
        @preview_panels = preview_panels
        @drawer_panels = drawer_panels
      end
    end
  end
end
