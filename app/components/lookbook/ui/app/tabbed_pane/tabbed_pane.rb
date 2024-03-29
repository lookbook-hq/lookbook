module Lookbook
  module UI
    class TabbedPane < BaseComponent
      with_slot :tab do |name, **kwargs, &block|
        @tabs_data << {name: name, kwargs: kwargs, block: block}
      end

      with_slot :action do |*args, **kwargs, &block|
        block ? block.call : lookbook_icon_button(*args, **kwargs)
      end

      attr_reader :id, :tabs_data

      def initialize(id:)
        @id = id
        @tabs_data = []
      end

      def tab_group_id
        Utils.id(id, "tabs")
      end

      def label
        Utils.label(id)
      end

      def tabs? = @tabs_data.any?
    end
  end
end
