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

      attr_reader :id, :tag_name

      def initialize(id:, tag_name: :div, opts: {}, **kwargs)
        @id = id
        @tag_name = tag_name
        @opts = opts
      end

      def opts
        @opts.transform_keys { _1.to_s.camelize(:lower) }
      end
    end
  end
end
