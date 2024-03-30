module Lookbook
  module UI
    class NotificationsPopup < BaseComponent
      ICONS = {
        error: "circle-alert",
        warning: "triangle-alert",
        success: "circle-check",
        info: "info"
      }

      attr_reader :notifications

      def initialize(notifications:, **kwargs)
        @notifications = notifications
      end

      def icon_name(notification)
        NotificationsPopup.icon_name(notification.type)
      end

      def self.icon_name(type)
        ICONS.fetch(type, ICONS[:info])
      end
    end
  end
end
