module Lookbook
  class Store < ActiveSupport::OrderedOptions
    def initialize(data = {}, opts = {})
      @recursive = opts[:recursive] || false
      data.each { |key, value| self[key] = value }
      super()
    end

    def []=(key, value)
      super(key, normalize_value(value))
    end

    def fetch(name, *args)
      super(name.to_sym, *args)
    end

    def method_missing(name, *args)
      if name.to_s.end_with?("=")
        args[0] = normalize_value(args[0])
      end
      super(name, *args)
    end

    def respond_to_missing?(name, include_private)
      true
    end

    private

    def normalize_value(value)
      @recursive && !value.is_a?(Store) && value.is_a?(Hash) ? Store.new(value, recursive: @recursive) : value
    end
  end
end
