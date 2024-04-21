module Lookbook
  module UI
    class Page < BaseComponent
      attr_reader :page

      def initialize(page:, **kwargs)
        @page = page
      end

      def previous_page
        page.previous
      end

      def next_page
        page.next
      end
    end
  end
end
