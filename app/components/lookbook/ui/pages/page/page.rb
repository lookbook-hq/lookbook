module Lookbook
  module UI
    class Page < BaseComponent
      def initialize(entity: nil, title: nil, header: nil, footer: nil, **kwargs)
        @entity = entity
        @title = title
        @footer = footer
      end

      def title
        @title || @entity&.title
      end

      def previous_page
        @entity&.previous
      end

      def next_page
        @entity&.next
      end

      def header?
        return @header unless @header.nil?

        @entity ? @entity.header? : true
      end

      def footer?
        return @footer unless @footer.nil?

        @entity ? @entity.footer? : true
      end
    end
  end
end
