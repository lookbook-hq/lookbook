module Lookbook
  class TagStore
    CONFIG_FILE = "config/tags.yml"

    attr_reader :store
    delegate :to_h, to: :store

    def initialize(config = nil)
      @store = {}
      config.to_h.each { add_tag(_1, _2) }
    end

    def add_tag(name, opts = nil)
      name = name.to_sym
      if store.key?(name)
        raise ConfigError.new("tag with name '#{name}' already exists", scope: "tags.config")
      else
        store[name] = build_config(name, opts)
      end
    end

    def get_tag(name)
      store[name.to_sym]
    end

    def self.init_from_config
      new(default_config)
    end

    def self.default_config
      ConfigLoader.call(CONFIG_FILE)
    end

    protected

    def build_config(name, opts = nil)
      opts = opts.to_h
      Store.new({
        name: name.to_sym,
        label: opts[:label] || name.to_s.titleize,
        tag_type: get_tag_type(opts.fetch(:tag_type, "BaseTag")),
        opts: opts[:opts].to_h
      })
    end

    def get_tag_type(tag_type)
      if tag_type.present?
        return tag_type if tag_type.is_a?(Class)
        begin
          "Lookbook::#{tag_type}".constantize
        rescue
          tag_type&.to_sym
        end
      end
    end
  end
end
