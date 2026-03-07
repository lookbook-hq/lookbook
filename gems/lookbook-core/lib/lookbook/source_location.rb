# frozen_string_literal: true

module Lookbook
  class SourceLocation < Lookbook::Data
    prop :path, Pathname, :positional, reader: :public do |value|
      Pathname(value.to_s) unless value.nil?
    end

    prop :line, _Integer?, :positional, reader: :public

    def value
      [path.to_s, line].join(":")
    end

    alias_method :to_s, :value
  end
end
