module Lookbook
  module WithPanelsConcern
    extend ActiveSupport::Concern

    included do
      private

      def main_panel_names
        [:preview, :output]
      end

      def main_panels
        Engine.panels.get_panels(*main_panel_names).map do |config|
          PanelStore.resolve_config(config, inspector_data)
        end
      end

      def drawer_panels
        panels = Engine.panels.get_panels(*Lookbook.config.preview_inspector.panels)
        panels.select { |config| !config.name.in?(main_panel_names) }.map do |config|
          PanelStore.resolve_config(config, inspector_data)
        end
      end
    end
  end
end
