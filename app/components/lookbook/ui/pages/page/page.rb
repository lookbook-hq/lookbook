module Lookbook
  module UI
    class Page < BaseComponent
      def initialize(page: nil, title: nil, header: nil, footer: nil, **kwargs)
        @page = page
        @title = title
        @footer = footer
      end

      def title
        @title || @page&.title
      end

      def previous_page
        @page&.previous
      end

      def next_page
        @page&.next
      end

      def header?
        return @header unless @header.nil?

        @page ? @page.header? : true
      end

      def footer?
        return @footer unless @footer.nil?

        @page ? @page.footer? : true
      end

      def markdown?
        @page&.markdown?
      end
    end
  end
end
