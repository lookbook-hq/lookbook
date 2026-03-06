# frozen_string_literal: true

module Booklet
  class EntityTree < Booklet::Object
    include Enumerable

    prop :path, Pathname, :positional, reader: :public

    prop :loader, Visitor, reader: :public do |value|
      value.is_a?(Class) ? value.new : value
    end

    prop :visitors, _Array(Visitor), reader: :public do |value|
      value.to_a.flatten.map { _1.is_a?(Class) ? _1.new : _1 }
    end

    prop :updated_at, Time, default: Time.current.freeze, writer: :protected, reader: :public

    def root
      load! unless @root
      @root
    end

    delegate :to_a, to: :root

    def load!
      @root = FolderNode.from(path).accept(loader)
      visitors.each { accept(_1) }
      touch! and return self
    end

    def each(...)
      root.each_node(...)
    end

    alias_method :each_node, :each

    def accept(visitor)
      result = root.accept(visitor)
      if root == result
        @root = result
        self
      else
        result
      end
    end

    def files
      root.grep(Locatable).map(&:path)
    end

    def issues
      root.accept(IssueAggregator)
    end

    delegate :errors, :warnings, :errors?, :warnings?, to: :issues

    def to_h(...)
      root.accept(HashConverter.new(...))
    end

    def to_ascii(...)
      root.accept(AsciiTreeRenderer.new(...))
    end

    protected def touch! = self.updated_at = Time.current
  end
end
