# frozen_string_literal: true

module Booklet
  class Data < Literal::Data
    include ActiveSupport::Callbacks
    include Comparable
    include Helpers

    define_callbacks :initialize

    def after_initialize
      run_callbacks :initialize
    end

    def ==(other)
      return nil if !other.is_a?(self.class)
      value == other.value
    end

    alias_method :eql?, :==

    class << self
      def after_initialize(&)
        set_callback :initialize, :after, &
      end
    end
  end
end
