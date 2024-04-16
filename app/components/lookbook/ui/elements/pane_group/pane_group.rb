module Lookbook
  module UI
    class PaneGroup < BaseComponent
      with_slot :pane do |*args, **kwargs, &block|
        if args.any? || kwargs.any?
          lb_pane(*args, **kwargs, &block)
        else
          block.call
        end
      end

      attr_reader :id, :tag_name, :orientation, :sizes, :min_sizes

      def initialize(id:, tag_name: :div, orientation: :horizontal, sizes: ["50%", "50%"], min_sizes: [], **kwargs)
        @id = id
        @tag_name = tag_name
        @orientation = orientation
        @sizes = sizes
        @min_sizes = min_sizes
      end
    end
  end
end
