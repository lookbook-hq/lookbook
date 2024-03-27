module Lookbook
  module UI
    class Panel < BaseComponent
      with_slot :action do |*args, **kwargs, &block|
        block ? block.call : lookbook_icon_button(*args, **kwargs)
      end

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
