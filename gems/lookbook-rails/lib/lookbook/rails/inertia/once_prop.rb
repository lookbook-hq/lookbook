# frozen_string_literal: true

module Lookbook::Rails
  module Inertia
    class OnceProp < BaseProp
      prepend PropOnceable

      def initialize(**, &block)
        @once = true
        super(&block)
      end
    end
  end
end
