module Lookbook
  module UI
    class Inspector < BaseComponent
      PANEL_COMPONENTS = {
        default: "Lookbook::UI::DefaultPanel",
        code: "Lookbook::UI::CodePanel",
        markdown: "Lookbook::UI::MarkdownPanel"
      }

      with_slot :preview_pane do |**kwargs|
        Pane.new(id: "#{@id}-viewer", **kwargs)
      end

      with_slot :drawer_pane do |**kwargs|
        drawer = Pane.new(id: "#{@id}-drawer", **kwargs)
        drawer.with_action(icon: :x, label: "Close drawer", tooltip: "Close", "@click": "hideDrawer")
        drawer
      end

      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end
    end
  end
end
