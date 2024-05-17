module Lookbook
  module UI
    class Button < BaseComponent
      attr_reader :icon_position, :size, :click, :tooltip

      tag_attr :type, :value, :name, :disabled, :href, :target

      def initialize(icon: nil, icon_position: :start, size: :md, click: nil, tooltip: nil, label: nil, **kwargs)
        @icon = icon
        @icon_position = icon_position
        @size = size
        @click = click
        @tooltip = tooltip
        @label = label
      end

      def icon? = @icon.present?

      def icon
        render Lookbook::UI::Icon.new(name: @icon, class: "button-icon") if @icon
      end

      def button_tag
        tag_attr?(:href) ? :a : :button
      end
    end
  end
end
