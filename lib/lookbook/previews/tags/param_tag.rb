require "strscan"

module Lookbook
  class ParamTag < YardTag
    TAG_NAME = "param"

    def param_name
      parts[:param_name].to_sym
    end

    def value_type
      if parts[:value_types].any?
        parts[:value_types].first.strip.downcase.to_sym
      end
    end

    def input_type
      parts[:input_type]&.to_sym
    end

    def description
      parts[:description]
    end

    def options_str
      parts[:options] || super
    end

    def parts
      @parts ||= scan_text
    end

    def value
      raise "@param tags do not have a value"
    end

    private

    def scan_text
      parts = {}
      scanner = StringScanner.new(@text.strip)

      # Name
      scanner.scan(/^([\d\w]+)\s?|$?/)
      if scanner.matched?
        parts[:param_name] = scanner.captures.first.strip
        last_pos = scanner.pos
      else
        raise ArgumentError, "No name found for @param tag"
      end

      # Data types
      scanner.scan(/\[([a-zA-Z]+)\]/)
      if scanner.matched?
        parts[:value_types] = scanner.captures.first.split(",")
        last_pos = scanner.pos
      else
        parts[:value_types] = []
        scanner.pos = last_pos
      end

      # Input type
      scanner.scan(/\s?(\w+)\s?/)
      if scanner.matched?
        parts[:input_type] = scanner.captures.first
        last_pos = scanner.pos
      else
        scanner.pos = last_pos
      end

      # Description
      scanner.scan(/\s?(?:'(?<single>[^'\\]*(?:\\.[^'\\]*)*)'|"(?<double>[^"\\]*(?:\\.[^"\\]*)*)")\s?/i)
      if scanner.matched?
        parts[:description] = scanner.captures.first.presence || scanner.captures.last
      else
        scanner.pos = last_pos
      end

      # Options
      parts[:options] = scanner.rest.strip

      parts
    end
  end
end
