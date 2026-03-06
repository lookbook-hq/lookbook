# frozen_string_literal: true

module Booklet
  class Node < Booklet::Object
    include Enumerable
    include Comparable

    attr_reader :parent
    attr_accessor :dirty, :visited_by
    protected attr_writer :parent

    after_initialize do
      @parent = nil
      @children ||= []
      @dirty = false
      @visited_by = []
    end

    def ref
      # @ref ||= object_id
      raise "Node#ref must be defined by subclasses"
    end

    def id = Helpers.hexdigest(tree_path { _1.ref })

    def issues = @issues ||= Issues.new

    def add_warning(warning)
      issues << Warning.new(warning, node: self)
    end

    def add_error(error)
      issues << Error.new(error, node: self)
    end

    delegate :warnings, :errors, :warnings?, :errors?, to: :issues

    def node_data = @node_data ||= Options.new({})

    # @!group Ancestry

    def root
      root = self
      root = root.parent until root.root?
      root
    end

    def root? = parent.nil?

    def detatch!
      self.parent = nil
      self
    end

    def ancestors
      return nil if root?

      ancestors = []
      prev_parent = parent
      while prev_parent
        ancestors << prev_parent
        prev_parent = prev_parent.parent
      end
      ancestors
    end

    # @!endgroup

    # @!group Descendants

    def descendants = filter { _1 != self }

    def children(&block)
      if block_given?
        @children.each(&block)
        self
      else
        @children.clone
      end
    end

    def children=(nodes)
      @children.each(&:detatch!)
      @children.clear
      push(*nodes)
    end

    delegate :[], to: :children

    def children? = children.any?

    def depth = ancestors&.size || 0

    def first_child = @children.first

    def last_child = @children.last

    def first_child? = self == first_child

    def last_child? = self == last_child

    def has_child?(node)
      children.find { _1.ref == node.ref && _1.type == node.type }
    end

    def leaf? = !children?

    def branch? = !leaf?

    # @!endgroup

    # @!group Siblings

    def siblings
      siblings = root? ? [] : parent.children.filter { _1 != self }
      if block_given?
        children.each(&block)
        self
      else
        siblings
      end
    end

    def first_sibling
      root? ? self : parent.children.first
    end

    def first_sibling? = self == first_sibling

    def last_sibling
      root? ? self : parent.children.last
    end

    def last_sibling? = self == last_sibling

    def next_sibling
      return nil if root?

      position = parent.children.index(self)
      parent.children.at(position + 1) if position
    end

    def previous_sibling
      return nil if root?

      position = sibling_index
      parent.children.at(position - 1) if position&.positive?
    end

    def sibling_index
      parent.children.index(self)
    end

    # @!endgroup

    # @!group Managing child nodes

    def insert_child(child, at_index = -1)
      validate_child!(child)

      raise ArgumentError, "Attempting to insert a child at a non-existent location" unless insertion_range.include?(at_index)

      child.remove_from_parent

      @children.insert(at_index, child)

      child.parent = self
      child
    end

    def insert_child_before(child, target)
      index = @children.index(target)
      raise ArgumentError, "Cannot find node to insert before" if index.nil?

      insert_child(child, index)
    end

    def insert_child_after(child, target)
      index = @children.index(target)
      raise ArgumentError, "Cannot find node to insert before" if index.nil?

      insert_child(child, index + 1)
    end

    def add_child(child) = insert_child(child, -1)

    alias_method :<<, :add_child

    def remove_child(child)
      return nil unless child

      @children.delete(child)
      child.detatch!
    end

    def remove_from_parent
      parent.remove_child(self) unless root?
    end

    private def insertion_range
      max = @children.size
      min = -(max + 1)
      min..max
    end

    # @!endgroup

    def validate_child!(node)
      raise ArgumentError, "Only Node instances can be added as children" unless node.is_a?(Node)
      raise ArgumentError, "`#{node.ref}` is already a child of node `#{ref}`" if has_child?(node)
      raise ArgumentError, "`#{node.ref}` is already attached to another node" unless node.root?

      raise ArgumentError, "Parent node does not accept children" if valid_child_node_types.nil?

      unless valid_child_node_types.any? { node.is_a?(_1.value) }
        raise TypeError, "Invalid node type '#{node.type}' - must be one of [#{valid_child_node_types.join(", ")}]"
      end
    end

    def push(*children)
      children.each { add_child(_1) }
      self
    end

    # @!endgroup

    # @!group Iteration

    def each_node
      return to_enum unless block_given?

      node_stack = [self]
      until node_stack.empty?
        current = node_stack.shift
        next unless current
        yield current
        node_stack = current.children.concat(node_stack)
      end

      self if block_given?
    end

    alias_method :each, :each_node
    alias_method :walk, :each_node

    # @!endgroup

    # @!group Comparison

    def <=>(other)
      return nil if other.nil? || !other.is_a?(Node)

      self_index = root.each_node.to_a.index(self)
      other_index = root.each_node.to_a.index(other)

      return nil if other_index.nil?

      other_index <=> self_index
    end

    # @!group Visting

    def accept(visitor)
      class_eval(<<~RUBY, __FILE__, __LINE__ + 1)
        def accept(visitor)
          visitor = visitor.is_a?(Class) ? visitor.new : visitor
          visitor.visit_#{type}(self)
        rescue Booklet::Warning => warning
          add_warning(warning)
        rescue Booklet::Error => error
          add_error(error)
        end
      RUBY

      accept(visitor)
    end

    def visited_by?(visitor)
      @visited_by.include?(visitor.is_a?(Class) ? visitor : visitor.class)
    end

    # @!endgroup

    # @!group Type & type checking

    def type
      @type ||= NodeType.new(self.class)
    end

    # @!endgroup

    # @!group Tree node path

    def tree_path(separator: "/", &block)
      nodes = [ancestors&.reverse, self].flatten.compact
      values = block ? nodes.map { block.call(_1) } : nodes.map { _1.ref }
      values.compact.join(separator)
    end

    # @!endgroup

    # @!group Missing method handling

    def method_missing(name, ...)
      if name.end_with?("?")
        false
      else
        super
      end
    end

    def respond_to_missing?(name, ...)
      name.end_with?("?") || super
    end

    # @!endgroup

    # @!group Utilities

    def inspect = "#<#{self.class.name} @ref=#{ref}>"

    # @!endgroup

    # @!group Child node type constraints

    class_attribute :valid_child_node_types,
      instance_predicate: false,
      default: []

    # @!endgroup

    def path = nil

    class << self
      def permit_child_nodes(*args)
        args.flatten!
        self.valid_child_node_types = args.map { NodeType.new(_1) } unless args.first.nil?
      end

      def type
        NodeType.new(self)
      end
    end

    permit_child_nodes Node
  end
end
