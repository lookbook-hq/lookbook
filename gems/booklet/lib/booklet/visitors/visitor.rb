# frozen_string_literal: true

module Booklet
  # Double-dispatch node visitor base class. Adapted from the Refract gem (https://github.com/yippee-fun/refract).
  #
  # @see https://github.com/yippee-fun/refract/blob/main/lib/refract/basic_visitor.rb
  class Visitor < Booklet::Object
    after_initialize do
      @stack = []
    end

    def visit(node)
      return unless node

      @stack.push(node)
      result = node.accept(self).tap { @stack.pop }
      node.visited_by |= [self.class]
      result
    end

    def visited?(node)
      node.visited_by?(self.class)
    end

    def visit_each(nodes)
      nodes.compact.each { visit(_1) }
    end

    def method_missing(name, *args, &block)
      if args.any? && name.start_with?("visit_")
        node = args.first
        if respond_to?(:visit_any)
          visit_any(node)
        else
          visit_each(node.children) if node.children?
          node
        end
      else
        super
      end
    end

    def respond_to_missing?(name, ...)
      (name != :visit_any && name.start_with?("visit_")) || super
    end

    class << self
      def visit(*node_classes, &block)
        node_classes.flatten!
        if node_classes.any?
          node_classes.each do |node_class|
            define_method("visit_#{node_class.type.name}", &block)
          end
        else
          define_method(:visit_any, &block)
        end
      end
    end
  end
end
