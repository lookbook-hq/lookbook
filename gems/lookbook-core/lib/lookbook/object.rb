# frozen_string_literal: true

module Lookbook
  class Object < Literal::Object
    include ActiveSupport::Callbacks
    include Helpers

    define_callbacks :initialize

    def after_initialize
      run_callbacks :initialize
    end

    class << self
      def after_initialize(&)
        set_callback :initialize, :after, &
      end
    end
  end
end
