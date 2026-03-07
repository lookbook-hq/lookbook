require "zeitwerk"
require "rails"
require_relative "inertia_rails"

module Lookbook
  module Rails
    class << self
      def version
        Lookbook.VERSION
      end

      def engine
        Engine
      end
    end
  end
end

Zeitwerk::Loader.for_gem_extension(Lookbook).tap do |loader|
  loader.push_dir("#{__dir__}/inertia_rails", namespace: Lookbook::InertiaRails)
  loader.push_dir("#{__dir__}/rails", namespace: Lookbook::Rails)
  loader.collapse("#{__dir__}/rails/{concerns,resources,visitors,patches,inspector}")
  loader.ignore("#{__dir__}/rails/{engine}.rb")
  loader.enable_reloading if ENV["LOOKBOOK_ENV"] == "development"
  loader.setup
end

require "lookbook/rails/engine" if defined?(Rails::Engine)
