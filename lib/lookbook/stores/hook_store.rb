module Lookbook
  class HookStore
    CONFIG_FILE = "config/hooks.yml"

    attr_reader :store
    delegate :to_h, to: :store

    def initialize(config = nil)
      @store = {}
    end

    def add_hook(event_name, callback)
      for_event(event_name) << callback
    end

    def for_event(event_name)
      store[event_name.to_sym] ||= []
    end

    def self.init_from_config
      new(default_config)
    end

    def self.default_config
      ConfigLoader.call(CONFIG_FILE)
    end
  end
end
