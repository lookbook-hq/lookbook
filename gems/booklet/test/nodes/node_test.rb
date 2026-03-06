require "support/test_helper"

module Booklet
  class NodeTest < Minitest::Test
    context "instance methods" do
      setup do
        @root = Node.new
        @child = Node.new
        @child_2 = Node.new
        @child_3 = Node.new
        @grandchild = Node.new
        @greatgrandchild = Node.new
        @greatgrandchild_2 = Node.new
      end

      context "Node#add_child" do
        should "allow child nodes to be added" do
          @root << @child
          @root << @child_2
          @root << @child_3

          assert_equal 3, @root.children.size
          assert_contains @root.children, @child
          assert_contains @root.children, @child_2
          assert_contains @root.children, @child_3
        end

        should "allow multiple levels of children" do
          @root << @child << @grandchild << @greatgrandchild

          assert_contains @root.children, @child
          assert_contains @child.children, @grandchild
          assert_contains @grandchild.children, @greatgrandchild

          assert_equal 1, @root.children.size
          assert_does_not_contain @root.children, @grandchild
          assert_does_not_contain @root.children, @greatgrandchild
        end

        should "prevent non-Node objects being added" do
          assert_raises(ArgumentError) { @root << Object.new }
        end

        should "prevent nodes being added multiple times" do
          @root << @child
          assert_raises(ArgumentError) { @root << @child }
        end

        should "prevent non-root nodes being added" do
          @child << @grandchild
          assert_raises(ArgumentError) { @root << @grandchild }
        end
      end

      context "Node#children" do
        setup do
          @root << @child
          @root << @child_2
          @root << @child_3
        end

        should "return an array of child nodes" do
          assert_equal 3, @root.children.size
          assert_equal [@child, @child_2, @child_3], @root.children
        end

        should "return a copy of the children so they cannot be mutated" do
          children = @root.children
          children << Node.new

          assert_equal 4, children.size
          assert_equal 3, @root.children.size

          children.shift

          assert_equal @child_2, children[0]
          assert_equal @child, @root.children[0]
        end
      end

      context "Node#each_node" do
        setup do
          @root << @child
          @root << @child_2
          @root << @child_3
          @child_2 << @grandchild << @greatgrandchild
          @grandchild << @greatgrandchild_2

          @ordered_nodes = [@root, @child, @child_2, @grandchild, @greatgrandchild, @greatgrandchild_2, @child_3]
        end

        should "return a _depth-first_, _left-to-right_ iterator for [node, *descendants]" do
          assert_equal 7, @root.each_node.count

          assert_equal @ordered_nodes, @root.to_a
        end

        should "yield each node from [node, *descendants] when a block is provided" do
          nodes = []

          @root.each_node do |node|
            assert_kind_of Node, node
            nodes << node
          end

          assert_equal @ordered_nodes, nodes
        end
      end

      context "Node#root" do
        should "return the root node" do
          @root << @child << @grandchild

          assert_equal @root, @grandchild.root
        end
      end

      context "comparison" do
        setup do
          @root << @child
          @root << @child_2
          @root << @child_3
          @child_2 << @grandchild << @greatgrandchild
          @grandchild << @greatgrandchild_2
        end

        context "greater than" do
          should "return true for a node above/before the other" do
            assert @root > @child
            assert @child > @grandchild
            assert @child_2 > @child_3
          end
        end

        context "less than" do
          should "return true for a node below/after the other" do
            assert @greatgrandchild_2 < @child
            assert @child_2 < @child
            assert @child_2 < @root
          end
        end
      end

      context "issues" do
        setup do
          @node = Node.new
        end

        context "Node#add_warning" do
          should "push a warning onto the node issues list" do
            @node.add_warning("Unwise thing to do")
            warning = @node.warnings.first

            assert @node.warnings?
            assert_equal 1, @node.warnings.count
            assert_kind_of Warning, warning
            assert_equal "Unwise thing to do", warning.message
          end
        end

        context "Node#add_error" do
          should "push an error onto the node issues list" do
            @node.add_error("Something went wrong")
            error = @node.errors.first

            assert @node.errors?
            assert_equal 1, @node.errors.size
            assert_kind_of Error, error
            assert_equal "Something went wrong", error.message
          end
        end
      end

      # --- Ancestry ---

      context "Node#root?" do
        should "return true for a root node" do
          assert @root.root?
        end

        should "return false for a child node" do
          @root << @child
          refute @child.root?
        end
      end

      context "Node#detatch!" do
        should "remove parent reference and return self" do
          @root << @child
          refute @child.root?

          result = @child.detatch!

          assert_equal @child, result
          assert @child.root?
          assert_nil @child.parent
        end
      end

      context "Node#ancestors" do
        should "return nil for root node" do
          assert_nil @root.ancestors
        end

        should "return array of ancestors for descendants" do
          @root << @child << @grandchild << @greatgrandchild

          assert_equal [@grandchild, @child, @root], @greatgrandchild.ancestors
          assert_equal [@child, @root], @grandchild.ancestors
          assert_equal [@root], @child.ancestors
        end
      end

      context "Node#depth" do
        should "return 0 for root node" do
          assert_equal 0, @root.depth
        end

        should "return correct depth for nested nodes" do
          @root << @child << @grandchild << @greatgrandchild

          assert_equal 1, @child.depth
          assert_equal 2, @grandchild.depth
          assert_equal 3, @greatgrandchild.depth
        end
      end

      # --- Descendants ---

      context "Node#children=" do
        should "replace children with new nodes" do
          @root << @child
          @root << @child_2

          new_child = Node.new
          @root.children = [new_child]

          assert_equal 1, @root.children.size
          assert_equal new_child, @root.children.first
          assert @child.root?
          assert @child_2.root?
        end
      end

      context "Node#[]" do
        should "provide array-style access to children" do
          @root << @child
          @root << @child_2
          @root << @child_3

          assert_equal @child, @root[0]
          assert_equal @child_2, @root[1]
          assert_equal @child_3, @root[2]
        end
      end

      context "Node#children?" do
        should "return true when has children" do
          @root << @child
          assert @root.children?
        end

        should "return false when empty" do
          refute @root.children?
        end
      end

      context "Node#first_child" do
        should "return the first child" do
          @root << @child
          @root << @child_2

          assert_equal @child, @root.first_child
        end

        should "return nil when no children" do
          assert_nil @root.first_child
        end
      end

      context "Node#last_child" do
        should "return the last child" do
          @root << @child
          @root << @child_2

          assert_equal @child_2, @root.last_child
        end

        should "return nil when no children" do
          assert_nil @root.last_child
        end
      end

      context "Node#first_child?" do
        should "compare self to own first child" do
          @root << @child
          @root << @child_2

          # first_child? checks self == self.first_child
          # which is true if the node itself is its own first_child
          # For @root, first_child is @child, so @root != @child
          refute @root.first_child?
        end
      end

      context "Node#last_child?" do
        should "compare self to own last child" do
          @root << @child
          @root << @child_2

          refute @root.last_child?
        end
      end

      context "Node#has_child?" do
        should "find child by ref and type" do
          @root << @child

          assert @root.has_child?(@child)
        end

        should "return nil when child not found" do
          @root << @child

          other = Node.new
          refute @root.has_child?(other)
        end
      end

      context "Node#leaf?" do
        should "return true for node with no children" do
          assert @root.leaf?
        end

        should "return false for node with children" do
          @root << @child
          refute @root.leaf?
        end
      end

      context "Node#branch?" do
        should "return true for node with children" do
          @root << @child
          assert @root.branch?
        end

        should "return false for node without children" do
          refute @root.branch?
        end
      end

      context "Node#descendants" do
        should "return all nodes except self" do
          @root << @child
          @root << @child_2
          @child << @grandchild

          desc = @root.descendants
          assert_includes desc, @child
          assert_includes desc, @child_2
          assert_includes desc, @grandchild
          refute_includes desc, @root
        end
      end

      # --- Siblings ---

      context "Node#siblings" do
        should "return parent's other children" do
          @root << @child
          @root << @child_2
          @root << @child_3

          assert_equal [@child_2, @child_3], @child.siblings
          assert_equal [@child, @child_3], @child_2.siblings
        end

        should "return empty array for root" do
          assert_equal [], @root.siblings
        end
      end

      context "Node#first_sibling" do
        should "return first of parent's children" do
          @root << @child
          @root << @child_2
          @root << @child_3

          assert_equal @child, @child_2.first_sibling
          assert_equal @child, @child_3.first_sibling
        end

        should "return self for root" do
          assert_equal @root, @root.first_sibling
        end
      end

      context "Node#first_sibling?" do
        should "return true for first child" do
          @root << @child
          @root << @child_2

          assert @child.first_sibling?
          refute @child_2.first_sibling?
        end
      end

      context "Node#last_sibling" do
        should "return last of parent's children" do
          @root << @child
          @root << @child_2
          @root << @child_3

          assert_equal @child_3, @child.last_sibling
          assert_equal @child_3, @child_2.last_sibling
        end

        should "return self for root" do
          assert_equal @root, @root.last_sibling
        end
      end

      context "Node#last_sibling?" do
        should "return true for last child" do
          @root << @child
          @root << @child_2

          refute @child.last_sibling?
          assert @child_2.last_sibling?
        end
      end

      context "Node#next_sibling" do
        should "return the next sibling" do
          @root << @child
          @root << @child_2
          @root << @child_3

          assert_equal @child_2, @child.next_sibling
          assert_equal @child_3, @child_2.next_sibling
        end

        should "return nil for last sibling" do
          @root << @child
          @root << @child_2

          assert_nil @child_2.next_sibling
        end

        should "return nil for root" do
          assert_nil @root.next_sibling
        end
      end

      context "Node#previous_sibling" do
        should "return the previous sibling" do
          @root << @child
          @root << @child_2
          @root << @child_3

          assert_equal @child, @child_2.previous_sibling
          assert_equal @child_2, @child_3.previous_sibling
        end

        should "return nil for first sibling" do
          @root << @child
          @root << @child_2

          assert_nil @child.previous_sibling
        end

        should "return nil for root" do
          assert_nil @root.previous_sibling
        end
      end

      # --- Managing children ---

      context "Node#insert_child" do
        should "insert at a specific index" do
          @root << @child
          @root << @child_3

          @root.insert_child(@child_2, 1)

          assert_equal [@child, @child_2, @child_3], @root.children
        end

        should "raise for out-of-range index" do
          assert_raises(ArgumentError) { @root.insert_child(@child, 5) }
        end
      end

      context "Node#insert_child_before" do
        should "insert before target node" do
          @root << @child
          @root << @child_3

          @root.insert_child_before(@child_2, @child_3)

          assert_equal [@child, @child_2, @child_3], @root.children
        end

        should "raise when target not found" do
          @root << @child

          assert_raises(ArgumentError) { @root.insert_child_before(@child_2, @child_3) }
        end
      end

      context "Node#insert_child_after" do
        should "insert after target node" do
          @root << @child
          @root << @child_3

          @root.insert_child_after(@child_2, @child)

          assert_equal [@child, @child_2, @child_3], @root.children
        end

        should "raise when target not found" do
          @root << @child

          assert_raises(ArgumentError) { @root.insert_child_after(@child_2, @child_3) }
        end
      end

      context "Node#remove_child" do
        should "remove and detatch child" do
          @root << @child
          @root << @child_2

          @root.remove_child(@child)

          assert_equal [@child_2], @root.children
          assert @child.root?
        end

        should "return nil for nil" do
          assert_nil @root.remove_child(nil)
        end
      end

      context "Node#remove_from_parent" do
        should "remove self from parent's children" do
          @root << @child
          @root << @child_2

          @child.remove_from_parent

          assert_equal [@child_2], @root.children
          assert @child.root?
        end
      end

      context "Node#push" do
        should "add multiple children at once" do
          @root.push(@child, @child_2, @child_3)

          assert_equal 3, @root.children.size
          assert_equal [@child, @child_2, @child_3], @root.children
        end
      end

      # --- Visitor acceptance ---

      context "Node#accept" do
        should "dispatch to visitor" do
          visitor = Visitor.new
          @root << @child

          result = @root.accept(visitor)

          assert_kind_of Node, result
        end

        should "accept visitor classes" do
          result = @root.accept(Visitor)

          assert_kind_of Node, result
        end
      end

      context "Node#visited_by?" do
        should "check visitor class" do
          visitor = Visitor.new
          @root.accept(visitor)

          refute @root.visited_by?(Visitor)
        end
      end

      # --- Type & identity ---

      context "Node#type" do
        should "return a NodeType" do
          assert_kind_of NodeType, @root.type
          assert_equal "node", @root.type.name
        end
      end

      context "Node#id" do
        should "return hexdigest of tree path" do
          @root << @child

          assert_kind_of String, @child.id
          assert_equal Helpers.hexdigest(@child.tree_path { _1.ref }), @child.id
        end
      end

      context "Node#tree_path" do
        should "return slash-separated path" do
          @root << @child << @grandchild

          path = @grandchild.tree_path
          parts = path.split("/")

          assert_equal 3, parts.size
        end

        should "support custom separator" do
          @root << @child

          path = @child.tree_path(separator: ".")

          assert_includes path, "."
          refute_includes path, "/"
        end

        should "support block for custom value extraction" do
          @root << @child

          path = @child.tree_path { _1.ref }

          assert_equal "#{@root.ref}/#{@child.ref}", path
        end
      end

      context "Node#node_data" do
        should "return an Options instance" do
          assert_kind_of Options, @root.node_data
        end
      end

      context "Node#inspect" do
        should "return readable string" do
          result = @root.inspect
          assert_includes result, "Node"
          assert_includes result, @root.ref.to_s
        end
      end

      context "Node#path" do
        should "return nil on base Node" do
          assert_nil @root.path
        end
      end

      # --- Method missing ---

      context "method_missing" do
        should "return false for any unknown ? method" do
          assert_equal false, @root.some_unknown_question?
          assert_equal false, @root.locatable?
          assert_equal false, @root.foobar?
        end

        should "raise NoMethodError for non-? methods" do
          assert_raises(NoMethodError) { @root.nonexistent_method }
        end
      end

      context "respond_to_missing?" do
        should "return true for ? methods" do
          assert @root.respond_to?(:whatever?)
          assert @root.respond_to?(:locatable?)
        end

        should "return false for non-? unknown methods" do
          refute @root.respond_to?(:nonexistent_method)
        end
      end

      # --- Comparison edge cases ---

      context "comparison edge cases" do
        should "return nil when comparing with nil" do
          assert_nil(@root <=> nil)
        end

        should "return nil when comparing with non-Node" do
          assert_nil(@root <=> "not a node")
        end
      end
    end
  end
end
