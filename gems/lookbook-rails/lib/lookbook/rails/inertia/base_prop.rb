# frozen_string_literal: true

module Lookbook::Rails
  module Inertia
    # Base class for all props.
    class BaseProp
      def initialize(**, &block)
        @block = block
      end

      def call(controller)
        controller.instance_exec(&@block)
      end
    end
  end
end
