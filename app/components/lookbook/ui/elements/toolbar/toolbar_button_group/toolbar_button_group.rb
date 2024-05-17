module Lookbook
  module UI
    class ToolbarButtonGroup < BaseComponent
      with_slot :button do |*args, **kwargs, &block|
        if args.any? || kwargs.any?
          lb_toolbar_button(*args, size: @size, **kwargs, &block)
        else
          block.call
        end
      end

      attr_reader :size

      def initialize(size: :md, **kwargs)
        @size = size
      end
    end
  end
end
