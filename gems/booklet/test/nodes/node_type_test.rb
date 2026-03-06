require "support/test_helper"

module Booklet
  class NodeTypeTest < Minitest::Test
    context "NodeType" do
      context "initialization" do
        should "initialize from a class" do
          type = NodeType.new(Node)
          assert_equal Node, type.type
        end

        should "initialize from a string" do
          type = NodeType.new("spec")
          assert_equal SpecNode, type.type
        end

        should "initialize from a symbol" do
          type = NodeType.new(:folder)
          assert_equal FolderNode, type.type
        end

        should "handle 'node' string without appending _node" do
          type = NodeType.new("node")
          assert_equal Node, type.type
        end
      end

      context "#name" do
        should "return underscored name without _node suffix" do
          type = NodeType.new(SpecNode)
          assert_equal "spec", type.name
        end

        should "return 'node' for base Node class" do
          type = NodeType.new(Node)
          assert_equal "node", type.name
        end

        should "return 'folder' for FolderNode" do
          type = NodeType.new(FolderNode)
          assert_equal "folder", type.name
        end
      end

      context "#to_s" do
        should "return name" do
          type = NodeType.new(ScenarioNode)
          assert_equal "scenario", type.to_s
        end
      end

      context "#==" do
        should "be equal to another NodeType with same class" do
          type1 = NodeType.new(SpecNode)
          type2 = NodeType.new(SpecNode)
          assert_equal type1, type2
        end

        should "be equal to the class itself" do
          type = NodeType.new(SpecNode)
          assert type == SpecNode
        end

        should "be equal to a matching string" do
          type = NodeType.new(SpecNode)
          assert type == "spec"
        end

        should "not be equal to a different type" do
          type = NodeType.new(SpecNode)
          refute type == FolderNode
        end
      end

      context "dynamic ? methods" do
        should "return true for matching type" do
          type = NodeType.new(SpecNode)
          assert type.spec?
        end

        should "return false for non-matching type" do
          type = NodeType.new(SpecNode)
          refute type.folder?
        end
      end
    end
  end
end
