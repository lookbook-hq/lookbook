require "zeitwerk"
require_relative "lookbook/version"
require_relative "lookbook/logger"

loader = Zeitwerk::Loader.for_gem
loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
loader.ignore("#{__dir__}/lookbook.rb")
loader.ignore("#{__dir__}/lookbook/filesystem/evented_file_update_checker.rb")
loader.collapse("#{__dir__}/lookbook/concerns")
loader.collapse("#{__dir__}/lookbook/errors")
loader.collapse("#{__dir__}/lookbook/filesystem")
loader.collapse("#{__dir__}/lookbook/previews")
loader.setup

Lookbook.logger.info("Lookbook log level: #{Lookbook.logger.level}")
Lookbook.logger.info("Lookbook version: #{Lookbook::VERSION}")

# The Lookbook application entry point.
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
      Lookbook::VERSION
    end

    # Provides access to the Lookbook config options
    #
    # @example :ruby
    #   Lookbook.config.project_title = "MyApp"
    #
    # @return [ActiveSupport::OrderedOptions] The config options object
    def config
      Lookbook::Config.current
    end

    def env
      Lookbook::Env
    end
  end
end

require "lookbook/engine"
