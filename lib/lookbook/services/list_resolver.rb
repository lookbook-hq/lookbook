module Lookbook
  class ListResolver < Service
    attr_reader :item_set

    def initialize(to_include = nil, item_set = nil)
      @to_include = to_include.is_a?(String) ? to_include.split(",").map(&:strip) : to_include
      @item_set = Array(item_set).compact.uniq.map(&:to_s)
    end

    def call(&resolver)
      included = to_include.each_with_object([]) do |name, result|
        if name.to_s == "*"
          result << "*"
        elsif item_set.include?(name)
          result << name
        end
        result
      end

      remaining_items = item_set.difference(included)
      included = included.flat_map do |name|
        if name == "*"
          rest = remaining_items
          remaining_items = []
          rest
        else
          name
        end
      end

      resolved = resolver ? included.map { |item| resolver.call(item) } : included
      resolved.compact.uniq
    end

    def to_include
      case @to_include
      when true
        ["*"]
      when false
        []
      else
        Array(@to_include).compact.uniq.map(&:to_s)
      end
    end
  end
end
