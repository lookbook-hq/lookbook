require "lookbook/inertia_rails/middleware"
require "lookbook/inertia_rails/configuration"

module Lookbook
  module InertiaRails
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
