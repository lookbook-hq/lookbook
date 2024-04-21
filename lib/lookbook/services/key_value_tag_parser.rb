module Lookbook
  class KeyValueTagParser < Service
    KEY_VALUE_REGEX = /^([^\s]+)\s+(.+)$/

    attr_reader :text

    def initialize(text)
      @text = text.to_s
    end

    def call
      text.strip.match(KEY_VALUE_REGEX) do |matches|
        key = matches[1]
        value = begin
          YAML.safe_load(matches[2] || "~")
        rescue ::Psych::SyntaxError
          raise ArgumentError, "Invalid YAML in tag text '#{@text}'"
        end
        return [key, value]
      end
      raise ArgumentError, "Could not parse key:value pair from '#{@text}'"
    end
  end
end
