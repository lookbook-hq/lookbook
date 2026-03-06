require "support/test_helper"

module Booklet
  class EntityTreeTest < Minitest::Test
    context "EntityTree" do
      setup do
        @tree = analyze_fixture("mixed")
      end

      context "#root" do
        should "return a root node" do
          assert_kind_of FolderNode, @tree.root
        end

        should "lazy-load on first access" do
          tree = EntityTree.new(Fixtures.dir("mixed"), loader: EntityLoader, visitors: [])
          assert_kind_of FolderNode, tree.root
        end
      end

      context "#each" do
        should "iterate all nodes" do
          count = 0
          @tree.each { count += 1 }
          assert count > 0
          assert_equal @tree.root.each_node.count, count
        end
      end

      context "#files" do
        should "return file paths" do
          files = @tree.files
          assert_kind_of Array, files
          files.each { assert_kind_of Pathname, _1 }
        end
      end

      context "#accept" do
        should "apply visitor to tree" do
          result = @tree.accept(HashConverter.new)
          assert_kind_of Hash, result
        end

        should "return self when visitor returns root" do
          result = @tree.accept(Visitor.new)
          assert_kind_of EntityTree, result
        end
      end

      context "#to_h" do
        should "return a hash representation" do
          hash = @tree.to_h
          assert_kind_of Hash, hash
        end
      end

      context "#issues" do
        should "return aggregated issues" do
          issues = @tree.issues
          assert_kind_of Issues, issues
        end
      end
    end
  end
end
