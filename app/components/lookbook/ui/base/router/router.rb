module Lookbook
  module UI
    class Router < BaseComponent
      attr_reader :events_endpoint

      def initialize(events_endpoint: nil)
        @events_endpoint = events_endpoint
      end
    end
  end
end
