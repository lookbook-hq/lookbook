module Lookbook
  module UI
    class StatusBarItem < BaseComponent
      attr_reader :icon, :label, :status

      def initialize(icon:, label: nil, status: :ok, **kwargs)
        @icon = icon
        @label = label
        @status = status
      end
    end
  end
end
