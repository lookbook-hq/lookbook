module Lookbook
  module UI
    class Page < BaseComponent
      attr_reader :page

      def initialize(page:, **kwargs)
        @page = page
      end
    end
  end
end
