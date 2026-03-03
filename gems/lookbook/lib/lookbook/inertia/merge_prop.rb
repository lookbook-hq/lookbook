# frozen_string_literal: true

module Lookbook
  module Inertia
    class MergeProp < BaseProp
      prepend PropOnceable
      prepend PropMergeable

      def initialize(**_props, &block)
        super(&block)
        @merge = true
      end
    end
  end
end
