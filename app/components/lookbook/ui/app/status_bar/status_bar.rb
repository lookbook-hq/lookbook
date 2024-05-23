module Lookbook
  module UI
    class StatusBar < BaseComponent
      ICONS = {
        error: "circle-x",
        warning: "triangle-alert",
        success: "circle-check",
        info: "info"
      }

      delegate_missing_to :@notifications, allow_nil: true

      def initialize(notifications: nil)
        @notifications = notifications
      end

      def self.icon_name(type)
        ICONS.fetch(type, ICONS[:info])
      end

      def status_bar_item(**kwargs, &block)
        render Lookbook::UI::StatusBarItem.new(**kwargs), &block
      end
    end
  end
end
