module Lookbook
  module WithPanelsConcern
    extend ActiveSupport::Concern

    included do
      private

      def main_panels
        Engine.panels.in_group(:main).map do |config|
          PanelStore.resolve_config(config, inspector_data)
        end
      end

      def drawer_panels
        Engine.panels.in_group(:drawer).map do |config|
          PanelStore.resolve_config(config, inspector_data)
        end
      end
    end
  end
end
