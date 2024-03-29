module Lookbook
  module UI
    class PreviewInspector < BaseComponent
      PANEL_COMPONENTS = {
        default: "Lookbook::UI::DefaultPanel",
        code: "Lookbook::UI::CodePanel",
        prose: "Lookbook::UI::ProsePanel",
        params: "Lookbook::UI::ParamsPanel"
      }

      with_slot :preview_panel do |panel, &block|
        add_panel(:preview_pane, panel, &block)
      end

      with_slot :drawer_panel do |panel, &block|
        add_panel(:drawer_pane, panel, &block)
      end

      attr_reader :id, :preview, :target

      def initialize(preview:, target:, id: "preview-inspector", **kwargs)
        @id = id
        @preview = preview
        @target = target
      end

      def preview_pane
        @preview_pane ||= begin
          pane = TabbedPane.new(id: "#{id}-preview-pane")
          pane.with_action(icon: :panel_bottom_open, tooltip: "Open drawer", click: "openDrawer", show: "hasDrawer && drawerClosed")
          pane.with_action(icon: :panel_bottom_close, tooltip: "Close drawer", click: "closeDrawer", show: "hasDrawer && !drawerClosed")
          pane.with_action(icon: :external_link, tooltip: "Open preview in new window", href: target.preview_path, target: "_blank")
          pane.with_action(icon: :layers, tooltip: "Preview overview", href: preview.url_path)
          pane
        end
      end

      def drawer_pane
        @drawer_pane ||= begin
          pane = TabbedPane.new(id: "#{id}-drawer-pane")
          pane.with_action(icon: :x, tooltip: "Close drawer", click: "closeDrawer")
          pane
        end
      end

      def add_panel(pane_name, panel, &block)
        public_send(pane_name).with_tab(panel.name, label: panel.label, &block)
      end

      def drawer? = drawer_pane.tabs?
    end
  end
end
