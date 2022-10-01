require "zeitwerk"
require "ostruct"
require "lookbook/version"

loader = Zeitwerk::Loader.for_gem
loader.ignore("#{__dir__}/lookbook.rb")
loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
loader.setup

module Lookbook
  class << self
    include Lookbook::Hooks
    include Lookbook::Panels
    include Lookbook::Tags

    def version
      Lookbook::VERSION
    end

    def config
      @config ||= Config.new
    end

    def configure
      yield(config)
    end

    def data
      @data ||= Store.new
    end

    def data=(new_data)
      @data = Store.new(new_data)
    end

    def logger
      @logger ||= if Rails.logger.present? && config.log_use_rails_logger
        Rails.logger
      else
        logger = Logger.new($stdout)
        logger.level = config.log_level
        logger
      end
    end

    def debug_data
      {
        version: version,
        env: Rails.env.to_s,
        config: config.to_h
      }
    end

    def previews
      Preview.all
    end

    def pages
      Page.all
    end

    def broadcast(event_name, data = {})
      Engine.websocket&.broadcast(event_name.to_s, data)
    end

    def theme
      @theme ||= Lookbook::Theme.new(config.ui_theme, config.ui_theme_overrides)
    end

    def define_param_input(input, partial, input_options = nil)
      config.preview_param_inputs[input.to_sym] = {
        partial: partial,
        input_options: input_options || {}
      }
    end
  end
end

require "lookbook/engine"
