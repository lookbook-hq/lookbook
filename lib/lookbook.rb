require "zeitwerk"
require "lookbook/version"

loader = Zeitwerk::Loader.for_gem
loader.ignore("#{__dir__}/lookbook.rb")
loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
loader.collapse("#{__dir__}/lookbook/*")
loader.collapse("#{__dir__}/lookbook/*/*")
loader.collapse("#{__dir__}/lookbook/*/*/*")
loader.setup

module Lookbook
  class << self
    def version
      Lookbook::VERSION
    end

    def config
      @_config ||= ConfigStore.init_from_config
    end

    def configure
      yield(config)
    end

    def engine
      Engine
    end

    def data
      @_data ||= Store.new
    end

    def data=(new_data)
      @_data = Store.new(new_data)
    end

    def logger
      @_logger ||= if Rails.logger.present? && config.log_use_rails_logger
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
        config: [
          config.to_h,
          {panels: Engine.panels.to_h},
          {inputs: Engine.inputs.to_h},
          {tags: Engine.tags.to_h}
        ].inject(:merge)
      }
    end

    def previews
      Engine.previews
    end

    def pages
      Engine.pages
    end

    def broadcast(event_name, data = {})
      Engine.websocket&.broadcast(event_name.to_s, data)
    end

    def theme
      @_theme ||= Lookbook::Theme.new(config.ui_theme, config.ui_theme_overrides)
    end

    def define_param_input(*args)
      Engine.inputs.add_input(*args)
    end

    def define_panel(name, *args)
      Engine.panels.add_panel(name, :drawer, *args)
    end

    def amend_panel(*args)
      Engine.panels.update_panel(*args)
    end

    def remove_panel(name)
      Engine.panels.remove_panel(name)
    end

    def define_tag(name, args = nil, &block)
      Engine.tags.add_tag(name, {
        named_args: args.to_a,
        after_parse: block
      })
    end

    def after_initialize(&block)
      Engine.hooks.add_hook(:after_initialize, block)
    end

    def before_exit(&block)
      Engine.hooks.add_hook(:before_exit, block)
    end

    def after_change(&block)
      Engine.hooks.add_hook(:after_change, block)
    end
  end
end

require "rails"
require "lookbook/engine"
