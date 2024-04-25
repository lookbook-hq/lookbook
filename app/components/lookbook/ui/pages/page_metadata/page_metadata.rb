module Lookbook
  module UI
    class PageMetadata < BaseComponent
      attr_reader :page

      def initialize(page:, **kwargs)
        @page = page
      end
    end
  end
end
