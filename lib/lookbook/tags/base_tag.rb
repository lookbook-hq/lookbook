module Lookbook
  class BaseTag < ::YARD::Tags::Tag
    def initialize(tag_name, text, types = nil, name = nil)
      super(tag_name.to_s, text.to_s.strip, types, name)
    end

    def value
      @text
    end

    def to_s
      value.to_s
    end
  end
end
