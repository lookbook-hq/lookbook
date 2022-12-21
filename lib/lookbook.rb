require "zeitwerk"
require "lookbook/version"

loader = Zeitwerk::Loader.for_gem
loader.ignore("#{__dir__}/lookbook.rb")
loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
loader.collapse("#{__dir__}/lookbook/*")
loader.collapse("#{__dir__}/lookbook/*/*")
loader.collapse("#{__dir__}/lookbook/*/*/*")
loader.ignore("#{__dir__}/lookbook/support/evented_file_update_checker.rb")
loader.ignore("#{__dir__}/lookbook/cable")
loader.setup

module Lookbook
  class << self
    # Returns the installed Lookbook version
    #
    # @return [String] Version number string
    def version
      Lookbook::VERSION
    end

    # Provides access to the Lookbook config store
    #
    # @example
    #   Lookbook.config.project_title = "MyApp"
    #
    # @return The config store object
    def config
      @_config ||= ConfigStore.init_from_config
    end

    # Preview entities
    #
    # @return [Array<PreviewEntity>] Array of preview entities
    def previews
      Engine.previews.to_a
    end

    # Documentation pages
    #
    # @return [Array<PageEntity>] Array of page entities
    def pages
      Engine.pages.to_a
    end

    # Get the global data store instance
    #
    # @return [Store] The global data store instance
    def data
      @_data ||= Store.new
    end

    # Replace the global data store contents with a new hash
    #
    # @param new_data [Hash] Hash of data to store
    # @return [Store] The global data store instance
    def data=(new_data)
      @_data = Store.new(new_data)
    end

    # Add a custom `@param` tag input type
    #
    # @param name [Symbol] Unique input type name
    # @param partial_path [String] Path to the partial template used to render the input
    # @param opts [Hash] Set of default options to be passed to the input. Any supplied param options will override these values
    def add_param_input(name, partial_path, **opts)
      Engine.inputs.add_input(name, partial_path, **opts)
    end

    # Add a custom inspector panel
    #
    # @param name [Symbol|String] Unique panel name
    # @param partial_path [String] Path to the partial template used to render the panel
    # @param [Hash] opts Set of panel options
    # @option opts [String] :label Display label override
    # @option opts [String] :hotkey Keyboard shortcut used to switch to the panel
    def add_panel(name, partial_path, **opts)
      Engine.panels.add_panel(name, partial_path, **opts)
    end

    # Edit the properties of an existing inspector panel
    #
    # @param name [Symbol|String] Name of target panel
    # @param opts [Hash] Set of panel options to update
    def edit_panel(name, **opts)
      Engine.panels.update_panel(name, **opts)
    end

    # Remove a panel from the inspector
    #
    # @param name [Symbol|String] Name of target panel
    def remove_panel(name)
      Engine.panels.remove_panel(name)
    end

    def add_tag(name, args = nil, &block)
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

    def broadcast(event_name, data = {})
      Engine.websocket&.broadcast(event_name.to_s, data)
    end

    # @deprecated
    def define_param_input(*args)
      add_param_input(*args)
    end

    # @deprecated
    def define_panel(name, *args)
      add_panel(name, *args)
    end

    # @deprecated
    def amend_panel(*args)
      edit_panel(*args)
    end

    # @deprecated
    def define_tag(...)
      add_tag(...)
    end

    # @api private
    def engine
      Engine
    end

    # @api private
    def configure
      yield(config)
    end

    # @api private
    def logger
      @_logger ||= if Rails.logger.present? && config.log_use_rails_logger
        Rails.logger
      else
        logger = Logger.new($stdout)
        logger.level = config.log_level
        logger
      end
    end

    # @api private
    def debug_data
      {
        version: version,
        env: Rails.env.to_s,
        config: [
          config.to_h,
          {
            dependencies: {
              actioncable: Engine.runtime_context.actioncable_installed?,
              listen: Engine.runtime_context.listen_installed?,
              view_component: config.using_view_component
            }
          },
          {panels: Engine.panels.to_h},
          {inputs: Engine.inputs.to_h},
          {tags: Engine.tags.to_h}
        ].inject(:merge)
      }
    end
  end
end

require "rails"
require "lookbook/engine"
