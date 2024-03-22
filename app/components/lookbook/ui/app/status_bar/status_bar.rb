module Lookbook
  module UI
    class StatusBar < BaseComponent
      with_slot :error do |error|
        @errors << error
      end

      def initialize
        @errors = []
      end

      def error_count = @errors.size

      def error_objects = @errors
    end
  end
end
