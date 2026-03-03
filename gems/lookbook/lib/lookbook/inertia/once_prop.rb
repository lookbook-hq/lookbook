# frozen_string_literal: true

module Lookbook
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
