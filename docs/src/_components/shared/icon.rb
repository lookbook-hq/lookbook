module Shared
  class Icon < Shared::Base
    attr_reader :size, :name
    
    def initialize(name:, size: :md, **attrs)
      @name = name
      @size = size
      @attrs = attrs
    end

    def icon_name
      parts = name_parts.many? ? name_parts[0..-2] : name_parts
      parts.join("-")
    end

    def style
      name_parts.many? ? name_parts.last : "solid"
    end

    def call
      tag.i class: "block fa-#{style} fa-#{icon_name} #{size_classes} #{attrs[:class]}"
    end

    protected

    def name_parts
      name.to_s.split("_")
    end

    def size_classes
      class_names({
        "h-3 w-3": size == :xs,
        "h-4 w-4": size == :sm,
        "h-5 w-5": size == :md,
      })
    end
  end
end