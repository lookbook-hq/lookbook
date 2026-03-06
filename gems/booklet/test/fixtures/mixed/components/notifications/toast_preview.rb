module Components
  module Notifications
    class ToastPreview < Lookbook::Preview
      def default
        render Toast.new("this is a notification message")
      end
    end
  end
end
