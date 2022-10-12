module Lookbook
  class Store < ActiveSupport::OrderedOptions
    def initialize(initial_data = nil, opts = {})
      @recursive = opts[:recursive] || false
      super()
      initial_data.to_h.each { self[_1] = _2 }
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

    # def [](key)
    #   key = key.to_sym
    #   if respond_to? key
    #     public_send(key)
    #   else
    #     self[key]
    #   end
    # end

    # def []=(key, value)
    #   setter_key = "#{key}=".to_sym
    #   if respond_to? setter_key
    #     public_send(setter_key, value)
    #   else
    #     _set(key.to_sym, normalize_value(value))
    #   end
    # end

    # def method_missing(key, *args)
    #   if key.to_s.end_with?("=")
    #     args[0] = normalize_value(args[0])
    #   end
    #   public_send(key.to_sym, *args)
    # end

    # def respond_to_missing?(key, *args)
    #   key?(key.to_sym)
    # end

    # def fetch(key, *args)
    #   super.fetch(key.to_sym, *args)
    # end

    def to_h
      transform_values do |value|
        value.is_a?(Store) ? value.to_h : value
      end
    end

    def to_hash
      to_h
    end

    protected

    def normalize_value(value)
      @recursive && !value.is_a?(Store) && value.is_a?(Hash) ? Store.new(value, recursive: @recursive) : value
    end
  end
end
