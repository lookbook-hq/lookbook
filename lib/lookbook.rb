require "zeitwerk"
require "literal"
require "lookbook/logger"
require "lookbook/errors"
require "active_support/environment_inquirer"

# Lookbook application entry point.
#
# @api public
module Lookbook
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
    # @return [DotHash] Config data object
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

    def loader
      @loader ||= begin
        loader = Zeitwerk::Loader.for_gem
        loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
        loader.collapse("#{__dir__}/lookbook/**/*")
        loader.ignore("#{__dir__}/lookbook/{version,logger,engine,errors}.rb")
        loader.enable_reloading if env.development?
        loader
      end
    end
  end

  logger.info(["Lookbook version", VERSION])
  logger.info(["Lookbook log level", Logger.level_as_string(logger.level)])
  logger.info(["Lookbook environment", env])
end

Lookbook.loader.setup

require "lookbook/engine" if defined?(Rails::Engine)
