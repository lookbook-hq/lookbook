module Lookbook
  module UI
    class ButtonGroup < BaseComponent
      with_slot :button do |*args, **kwargs, &block|
        @items << if args.any? || kwargs.any?
          lb_button(*args, size: @size, **kwargs)
        else
          block.call
        end
      end

      with_slot :divider do
        @items << lb_tag(class: "button-group-divider")
      end

      attr_reader :size

      def initialize(size: :md, **kwargs)
        @size = size
        @items = []
      end
    end
  end
end
