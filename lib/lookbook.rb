require "zeitwerk"
require "yard"
require_relative "lookbook/version"
require_relative "lookbook/logger"

loader = Zeitwerk::Loader.for_gem
loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
loader.ignore("#{__dir__}/lookbook.rb")
loader.ignore("#{__dir__}/lookbook/logger.rb")
loader.ignore("#{__dir__}/lookbook/evented_file_update_checker.rb")
loader.do_not_eager_load("#{__dir__}/lookbook/evented_file_update_checker.rb")
loader.collapse("#{__dir__}/lookbook/concerns")
loader.collapse("#{__dir__}/lookbook/errors")
loader.collapse("#{__dir__}/lookbook/helpers")
loader.collapse("#{__dir__}/lookbook/markdown")
loader.collapse("#{__dir__}/lookbook/pages")
loader.collapse("#{__dir__}/lookbook/previews")
loader.collapse("#{__dir__}/lookbook/previews/*")
loader.collapse("#{__dir__}/lookbook/services")
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
      @env ||= ActiveSupport::StringInquirer.new(ENV["LOOKBOOK_ENV"] || "production")
    end

    def add_panel(name, partial_path, opts = {})
      Lookbook.config.inspector_panels[name.to_sym] = {
        partial: partial_path,
        **opts
      }
    end
  end
end

require "rails"
require "lookbook/engine"
