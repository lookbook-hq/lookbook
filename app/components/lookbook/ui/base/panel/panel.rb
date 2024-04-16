module Lookbook
  module UI
    class Panel < BaseComponent
      attr_reader :id

      def initialize(id:, padded: false, scrollable: true, **kwargs)
        @id = id
        @padded = padded
        @scrollable = scrollable
      end

      def label
        Utils.label(id)
      end

      def padded? = @padded

      def scrollable? = @scrollable
    end
  end
end
