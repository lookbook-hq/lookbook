module Lookbook
  module UI
    class Pane < BaseComponent
      with_slot :title

      with_slot :action do |*args, **kwargs, &block|
        block ? block.call : lookbook_icon_button(*args, **kwargs)
      end

      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end

      def label
        Utils.label(id)
      end
    end
  end
end
