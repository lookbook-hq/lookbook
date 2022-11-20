module Lookbook
  class PositionPrefixParser < Service
    POSITION_PREFIX_REGEX = /^(\d+?)[-_]/

    attr_reader :input

    def initialize(input)
      @input = String(input)
    end

    def call
      matches = input.match(POSITION_PREFIX_REGEX)
      matches ? [matches[1].to_i, input.gsub(POSITION_PREFIX_REGEX, "")] : [nil, input]
    end
  end
end
