module Lookbook
  class ParamTag < BaseTag
    def initialize(tag_name, text)
      name, text_without_name = extract_name(text.strip)
      super(tag_name, text_without_name, nil, name)
    end

    protected

    def extract_name(text)
      parts = text.split(" ")
      [parts.shift, parts.join(" ")]
    end
  end
end
