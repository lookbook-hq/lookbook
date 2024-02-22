require "active_support"

module Lookbook
  module Reloaders
    class << self
      include Loggable

      def register(reloader)
        raise ArgumentError, "Reloader '#{reloader.name}' is already registered" if reloader.in?(reloaders)

        reloaders.push(reloader)

        Rails.application.reloaders << reloader
        Rails.application.reloader.to_run { reloader.execute_if_updated }

        debug("#{reloader.name}: reloader registered")
      end

      def execute
        reloaders.each { _1.execute }
      end

      private

      def reloaders
        @reloaders ||= []
      end
    end
  end
end
