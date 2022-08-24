module Lookbook
  class Tag    
    delegate :name, :types, :text, to: :@tag_object

    def initialize(name, tag_object)
      @name = name
      @tag_object = tag_object
    end

    def text_parts
      text.strip.match(/^([^\s]*)\s?(.*)$/).to_a.drop(1)
    end
  end
end