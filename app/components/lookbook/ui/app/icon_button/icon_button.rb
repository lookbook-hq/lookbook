module Lookbook
  module UI
    class IconButton < BaseComponent
      attr_reader :icon_name, :tooltip, :click, :show, :href, :label

      def initialize(icon:, tooltip: nil, href: nil, click: nil, show: nil, label: nil, **kwargs)
        @icon_name = icon.to_s.tr("_", "-")
        @tooltip = tooltip
        @href = href
        @click = click
        @show = show
        @label = label || @tooltip
      end
    end
  end
end
