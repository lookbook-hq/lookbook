module Lookbook
  module UI
    class StatusBar < BaseComponent
      delegate_missing_to :@notifications, allow_nil: true

      def initialize(notifications: nil)
        @notifications = notifications
      end
    end
  end
end
