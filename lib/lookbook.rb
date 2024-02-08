require "zeitwerk"
require "logger"
require "lookbook/version"
require "lookbook/logger"

loader = Zeitwerk::Loader.for_gem
loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
loader.ignore("#{__dir__}/lookbook.rb")
loader.collapse("#{__dir__}/lookbook/*")
loader.setup

# Won't print anything by default because of level - unless you've set
# LOOKBOOK_LOG_LEVEL or provided your own logger with a high enough level
Lookbook.logger.info "Lookbook log level set to: #{Lookbook.logger.level}"
Lookbook.logger.info "Lookbook version: #{Lookbook::VERSION}"

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
  end
end

require "rails"
require "lookbook/engine"
