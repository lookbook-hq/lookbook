module Lookbook
  module UI
    class App < BaseComponent
      with_slot :header
      with_slot :sidebar
      with_slot :main

      attr_reader :events_endpoint

      def initialize(events_endpoint: nil)
        @events_endpoint = events_endpoint
      end
    end
  end
end
