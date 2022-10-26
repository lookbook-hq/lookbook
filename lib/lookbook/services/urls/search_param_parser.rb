module Lookbook
  class SearchParamParser < Service
    attr_reader :param_value

    def initialize(param_value)
      @param_value = param_value.strip
    end

    def call
      pairs_str = param_value.split("|")
      pairs = pairs_str.map { |pair| [*pair.split(":").map(&:strip)] }
      pairs.to_h.symbolize_keys
    end
  end
end
