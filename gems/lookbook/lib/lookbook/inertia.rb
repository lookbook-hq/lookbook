require "lookbook/inertia/middleware"

module Lookbook
  module Inertia
    CONFIGURATION = Configuration.default

    class << self
      def configuration
        CONFIGURATION
      end

      def always(&block)
        AlwaysProp.new(&block)
      end

      def once(...)
        OnceProp.new(...)
      end
    end
  end
end
