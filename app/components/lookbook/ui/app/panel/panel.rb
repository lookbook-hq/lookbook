module Lookbook
  module UI
    class Panel < BaseComponent
      with_slot :action do |icon: nil, label: nil, tooltip: nil, **kwargs, &block|
        return block.call if block

        action = tag.send(:sl_icon_button, name: icon.to_s.tr("_", "-"), label: label || tooltip, **kwargs)
        tooltip.present? ? tag.send(:sl_tooltip, content: tooltip) { action } : action
      end

      attr_reader :id

      def initialize(id:, padded: false, scrollable: true, **kwargs)
        @id = id
        @padded = padded
        @scrollable = scrollable
      end

      def label
        Utils.label(id)
      end

      def padded? = @padded

      def scrollable? = @scrollable
    end
  end
end
