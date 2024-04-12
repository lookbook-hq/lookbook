module Lookbook
  module UI
    class Button < BaseComponent
      attr_reader :icon, :size, :click, :show, :tooltip

      tag_attr :type, :value, :name, :disabled, :href, :target

      def initialize(icon:, size: :md, click: nil, show: nil, tooltip: nil, label: nil, **kwargs)
        @icon = icon
        @size = size
        @click = click
        @show = show
        @tooltip = tooltip
        @label = label
      end

      def button_tag
        tag_attr?(:href) ? :a : :button
      end
    end
  end
end
