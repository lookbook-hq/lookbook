module Lookbook
  module UI
    class StatusBarItem < BaseComponent
      with_slot :panel

      attr_reader :label, :theme

      def initialize(icon: nil, label: nil, theme: :notice, **kwargs)
        @icon = icon
        @label = label
        @theme = theme
      end

      def icon
        @icon || StatusBar.icon_name(theme)
      end
    end
  end
end
