module Lookbook
  module UI
    class StatusBarItem < BaseComponent
      with_slot :panel

      attr_reader :label, :theme, :tooltip

      def initialize(icon: nil, label: nil, tooltip: nil, theme: :notice, click: nil, **kwargs)
        @icon = icon
        @label = label
        @theme = theme
        @tooltip = tooltip
      end

      def icon
        @icon || StatusBar.icon_name(theme)
      end
    end
  end
end
