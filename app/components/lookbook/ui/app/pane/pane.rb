module Lookbook
  module UI
    class Pane < BaseComponent
      with_slot :toolbar do
        Toolbar.new(class: "pane-toolbar")
      end

      # with_slot :title do |&block|
      #   pane_toolbar.with_title(&block)
      # end

      # with_slot :action do |*args, **kwargs, &block|
      #   pane_toolbar.with_action(*args, **kwargs, &block)
      # end

      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end
    end
  end
end
