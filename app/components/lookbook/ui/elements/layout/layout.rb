module Lookbook
  module UI
    class Layout < BaseComponent
      with_slot :pane do |*args, **kwargs, &block|
        if args.any? || kwargs.any?
          lookbook_pane(*args, **kwargs, &block)
        else
          block.call
        end
      end

      attr_reader :id, :tag_name, :orientation

      def initialize(id:, tag_name: :div, orientation: :horizontal, **kwargs)
        @id = id
        @tag_name = tag_name
        @orientation = orientation
      end
    end
  end
end
