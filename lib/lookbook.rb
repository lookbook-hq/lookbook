require "active_support"
require "active_support/core_ext"
require "zeitwerk"

require "lookbook/logger"
require "lookbook/errors"

# Lookbook application entry point.
#
# @api public
module Lookbook
  Loader = Zeitwerk::Loader.for_gem
  Loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
  Loader.collapse("#{__dir__}/lookbook/**/*")
  Loader.ignore("#{__dir__}/lookbook/{version,logger,engine,errors}.rb")
  Loader.enable_reloading if ENV["LOOKBOOK_ENV"] == "development"
  Loader.setup

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

    def env
      @env ||= ActiveSupport::EnvironmentInquirer.new(ENV["LOOKBOOK_ENV"] || "production")
    end

    # Returns the shared config object instance
    #
    # @return [Options] Config data object
    def config
      Config.current
    end

    # @yield Provides a block for config options access
    # @yieldparam [Lookbook::Config] The shared config object instance
    def configure
      yield(config)
    end

    # @api private
    def engine
      Engine
    end
  end

  logger.info(["Lookbook version", VERSION])
  logger.info(["Lookbook log level", Logger.level_as_string(logger.level)])
  logger.info(["Lookbook environment", env])
end

require "lookbook/engine" if defined?(Rails::Engine)
