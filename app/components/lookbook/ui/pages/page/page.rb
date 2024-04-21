module Lookbook
  module UI
    class Page < BaseComponent
      def initialize(entity: nil, title: nil, footer: true, **kwargs)
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

      def footer? = @footer
    end
  end
end
