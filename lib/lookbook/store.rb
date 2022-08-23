module Lookbook
  class Store < ActiveSupport::OrderedOptions
    def initialize(data = {}, deep = true)
      super()
      @deep = deep
      set(data) if data.present?
    end

    def [](key)
      super(normalize_key(key))
    end

    def []=(key, value)
      super(normalize_key(key), normalize_value(value))
    end

    def set(data)
      data.keys.each do |key|
        self[normalize_key(key)] = normalize_value(data[key])
      end
      self
    end

    def get(key, fallback = nil)
      if self.key?(normalize_key(key))
        self[normalize_key(key)]
      else
        fallback
      end
    end

    def method_missing(name, *args)
      super(normalize_key(name), *args.map { |arg| normalize_value(arg) })
    end

    def normalize_key(key)
      key.to_s.downcase.gsub("-", "_").to_sym
    end

    def normalize_value(value)
      @deep && value.is_a?(Hash) ? Store.new(value) : value
    end
  end
end