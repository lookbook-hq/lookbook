module Lookbook
  module UI
    class Viewport < BaseComponent
      attr_reader :src

      def initialize(src:, **kwargs)
        @src = src
      end
    end
  end
end
