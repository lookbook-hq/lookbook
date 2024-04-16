module Lookbook
  module UI
    class StatusBarNotifications < BaseComponent
      attr_reader :notifications

      def initialize(notifications:, **kwargs)
        @notifications = notifications
      end

      def icon_name(notification)
        StatusBar.icon_name(notification.type)
      end
    end
  end
end
