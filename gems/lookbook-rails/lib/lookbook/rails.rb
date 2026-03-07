require "zeitwerk"
require "rails"
require "lookbook"

# Lookbook application entry point.
#
# @api public
module Lookbook
  module Rails
    class << self
      # Returns the installed Lookbook version
      #
      # @example :erb
      #   <p>Using Lookbook v<%= Lookbook.version %></p>
      #
      # @return [String] Version number string
      def version
        VERSION
      end

      # @api private
      def engine
        Engine
      end
    end
  end
end

Zeitwerk::Loader.for_gem_extension(Lookbook).tap do |loader|
  loader.push_dir("#{__dir__}/rails", namespace: Lookbook::Rails)
  loader.collapse("#{__dir__}/rails/{concerns,resources,visitors,patches,inspector}")
  loader.ignore("#{__dir__}/rails/{engine}.rb")
  loader.enable_reloading if ENV["LOOKBOOK_ENV"] == "development"
  loader.setup
end

require "lookbook/rails/engine" if defined?(Rails::Engine)
