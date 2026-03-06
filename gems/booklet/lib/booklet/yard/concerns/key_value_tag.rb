# frozen_string_literal: true

require "psych/syntax_error"

module Booklet
  module YARD
    module KeyValueTag
      extend ActiveSupport::Concern

      KEY_VALUE_TAG_REGEX = /^([^\s]+)\s+(.+)$/

      included do
        def value
          @value ||= parse_key_value_parts
        end

        alias_method :to_h, :value

        protected def parse_key_value_parts
          @parts ||= begin
            @text.strip.match(KeyValueTag::KEY_VALUE_TAG_REGEX) do |matches|
              key = matches[1]
              value = begin
                YAML.safe_load(matches[2] || "~")
              rescue Psych::SyntaxError
                raise "Invalid YAML in tag text '#{@text}'"
              end
              return Hash[key.to_sym, value]
            end
            raise "Could not parse key:value pair from '#{@text}'"
          end
        end
      end
    end
  end
end
