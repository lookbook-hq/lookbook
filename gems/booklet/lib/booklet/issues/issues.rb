# frozen_string_literal: true

module Booklet
  class Issues < Booklet::Object
    include Enumerable

    prop :issues, _Array(Issue), :positional, default: -> { [] }

    def add(*issues)
      issues.flatten.each do |issue|
        unless issue.is_a?(Issue)
          raise ArgumentError, "Instance of `Error` or `Warning` expected (#{issue.class.name} given)"
        end
        @issues.push(issue)
      end
      self
    end

    alias_method :<<, :add

    def warnings
      all.grep(Warning)
    end

    def warnings?
      warnings.any?
    end

    def errors
      all.grep(Error)
    end

    def errors?
      errors.any?
    end

    def all
      @issues
    end

    def clear
      @issues.clear
      self
    end

    delegate :each, :to_a, to: :@issues
  end
end
