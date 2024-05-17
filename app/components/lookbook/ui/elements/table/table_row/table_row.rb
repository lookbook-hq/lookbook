module Lookbook
  module UI
    class TableRow < BaseComponent
      with_slot :cell do |*args, collapse: false, centered: false, **kwargs, &block|
        contents = args.first
        contents ||= (block.present? ? capture(self, &block) : nil)
        kwargs[:scope] = "col" if @header

        classes = {
          collapse: collapse,
          centered: centered
        }

        kwargs[:class] = [kwargs[:class], classes]

        tag.send(@header ? :th : :td, **kwargs) do
          contents
        end
      end

      def initialize(header: false, **kwargs)
        @header = header
      end
    end
  end
end
