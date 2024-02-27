module Lookbook
  module UI
    class Inspector < BaseComponent
      PANEL_COMPONENTS = {
        default: "Lookbook::UI::DefaultPanel",
        code: "Lookbook::UI::CodePanel",
        markdown: "Lookbook::UI::MarkdownPanel"
      }

      with_slot :preview_pane do |**kwargs|
        pane = Pane.new(id: "#{@id}-preview-pane", **kwargs)
        # pane.with_action(icon: :x, label: "Close drawer", tooltip: "Close", "@click": "hideDrawer")
        pane
      end

      with_slot :drawer_pane do |**kwargs|
        pane = Pane.new(id: "#{@id}-drawer-pane", **kwargs)
        pane.with_action(icon: :x, label: "Close drawer", tooltip: "Close", "@click": "hideDrawer")
        pane
      end

      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end
    end
  end
end
