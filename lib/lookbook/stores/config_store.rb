module Lookbook
  # Configuration store for Lookbook.
  #
  # Config option values can be get/set using hash property access syntax
  # or dot-notation syntax.
  #
  # @example :ruby
  #   # Lookbook config access in Rails config files:
  #   config.lookbook.ui_theme = :zinc
  #
  #   # Lookbook config access everywhere else:
  #   Lookbook.config.ui_theme = :zinc
  #
  # @ignore methods
  # @api public
  class ConfigStore
    CONFIG_FILE = "config/app.yml"

    delegate_missing_to :store
    attr_reader :store

    def initialize(config = nil)
      @store = Store.new(config, recursive: true)
    end

    def project_name=(name)
      store[:project_name] = (name == false) ? nil : name
    end

    def page_paths=(paths = nil)
      store[:page_paths].push(*paths.to_a)
    end

    def page_extensions=(extensions = nil)
      store[:page_extensions].push(*extensions.to_a).uniq!
    end

    def preview_paths=(paths = nil)
      store[:preview_paths].push(*paths.to_a)
    end

    def listen_extensions=(extensions = nil)
      store[:listen_extensions].push(*extensions.to_a).uniq!
    end

    def markdown_options=(options = nil)
      store[:markdown_options].merge!(options.to_h)
    end

    def highlighter_options=(options = nil)
      store[:highlighter_options].merge!(options.to_h)
    end

    def ui_theme=(name)
      name = name.to_s
      if Theme.valid_theme?(name)
        store[:ui_theme] = name
      else
        raise ConfigError.new("'#{name}' is not a valid Lookbook theme. ", scope: "app.config")
      end
    end

    def ui_theme_overrides(&block)
      if block
        yield store[:ui_theme_overrides]
      else
        store[:ui_theme_overrides]
      end
    end

    def self.init_from_config(env: Rails.env)
      new(default_config(env: env))
    end

    def self.default_config(env: Rails.env)
      ConfigLoader.call(CONFIG_FILE, env: env)
    end
  end
end
