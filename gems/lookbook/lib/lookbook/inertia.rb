require "lookbook/inertia/middleware"

module Lookbook
  module Inertia
    CONFIGURATION = Configuration.default

    class << self
      def configuration
        CONFIGURATION
      end

      def optional(...)
        OptionalProp.new(...)
      end

      def always(&block)
        AlwaysProp.new(&block)
      end

      def once(...)
        OnceProp.new(...)
      end

      def merge(...)
        MergeProp.new(...)
      end

      def deep_merge(match_on: nil, &block)
        MergeProp.new(deep_merge: true, match_on: match_on, &block)
      end

      def defer(...)
        DeferProp.new(...)
      end
    end
  end
end
