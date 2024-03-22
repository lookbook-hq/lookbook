module Lookbook
  module UI
    class Pane < BaseComponent
      with_slot :title

      with_slot :action do |icon: nil, tooltip: nil, label: nil, **kwargs, &block|
        if block
          block.call
        else
          action = tag.send(:sl_icon_button, name: icon.to_s.tr("_", "-"), label: label || tooltip, **kwargs)
          tooltip.present? ? tag.send(:sl_tooltip, content: tooltip, hoist: true) { action } : action
        end
      end

      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end

      def label
        Utils.label(id)
      end
    end
  end
end
