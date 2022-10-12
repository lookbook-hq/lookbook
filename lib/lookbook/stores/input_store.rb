module Lookbook
  class InputStore
    CONFIG_FILE = "config/inputs.yml"

    DEFAULTS = {
      # TODO
    }

    attr_reader :store
    delegate :to_h, to: :store

    def initialize(config = nil)
      @store = {}

      config.to_h.each do |name, opts|
        add_input(name, opts[:partial], opts.except(:partial))
      end
    end

    def add_input(input, *args)
      store[input.to_sym] = build_config(input, *args)
    end

    def get_input(input)
      store[input.to_sym]
    end

    def self.init_from_config
      new(default_config)
    end

    def self.default_config
      ConfigLoader.call(CONFIG_FILE)
    end

    protected

    def build_config(name, *args)
      partial = nil
      opts = nil
      if args.many? && args.last.is_a?(Hash)
        partial = args.first
        opts = args.last
      elsif args.first.is_a?(String)
        partial = args.first
      end
      if partial.present?
        Store.new({
          name: name.to_sym,
          partial: partial,
          opts: DEFAULTS.merge(opts.to_h)
        })
      else
        raise ConfigError.new("inputs must define a partial path", "inputs.config")
      end
    end
  end
end
