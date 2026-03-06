# frozen_string_literal: true

module Booklet
  module YARD
    class ParamTag < Tag
      include AcceptsOptions

      tag_name :param

      def param_name = parts[:param_name].to_sym

      def value_type
        if parts[:value_types].any?
          parts[:value_types].first.strip.downcase.to_sym
        end
      end

      def control_type = parts[:control_type]&.to_sym

      def description = parts[:description]

      def options_string = parts[:options_string] || super

      def value
        {name:, value_type:, control_type:, description:, options_string:}
      end

      alias_method :to_h, :value
      alias_method :name, :param_name

      protected def parts
        @parts ||= scan_text
      end

      private def scan_text
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
          parts[:control_type] = scanner.captures.first
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
        parts[:options_string] = scanner.rest.strip
        parts
      end
    end
  end
end
