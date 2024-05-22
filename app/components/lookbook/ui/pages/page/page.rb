module Lookbook
  module UI
    class Page < BaseComponent
      def initialize(page: nil, options: {}, **kwargs)
        @page = page
        @options = options
      end

      def option(name, fallback = nil)
        @options.fetch(name, fallback)
      end

      def title
        option(:title, @page&.title)
      end

      def status
        option(:status)
      end

      def previous_page
        @page&.previous
      end

      def next_page
        @page&.next
      end

      def header?
        option(:header, @page ? @page.header? : true)
      end

      def footer?
        option(:footer, @page ? @page.footer? : true)
      end

      def markdown?
        option(:markdown, @page&.markdown?)
      end
    end
  end
end
