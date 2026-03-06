require "support/test_helper"

module Booklet
  class EntityLoaderTest < Minitest::Test
    context "entity loader" do
      setup do
        @root_path = Fixtures.dir("mixed")
        @root = FolderNode.from(@root_path)
      end

      should "recursively create entity nodes for all files" do
        @root.accept(EntityLoader.new)

        assert_equal Fixtures.files_within(@root_path).size, @root.descendants.grep(Locatable).size
      end

      should "not create entities for ignored files" do
        @root.accept(EntityLoader.new(ignore_rules: ["_tmp.*"]))
        ignored_files = Fixtures.files_within(@root_path, grep: /_tmp\./)

        assert_equal(
          Fixtures.files_within(@root_path).size - ignored_files.count,
          @root.descendants.grep(Locatable).size
        )
      end

      context "branches containing only directories" do
        setup do
          @root_path = Fixtures.dir("empty_dirs")
          @root = FolderNode.from(@root_path)
        end

        should "not be included in the tree" do
          @root.accept(EntityLoader)
          nodes = @root.descendants

          assert nodes.find { _1.path.basename.to_s == "a" }
          assert nodes.find { _1.path.basename.to_s == "aa" }
          assert nodes.find { _1.path.basename.to_s == "aaa.txt" }

          refute nodes.find { _1.path.basename.to_s == "b" }
          refute nodes.find { _1.path.basename.to_s == "bb" }
          refute nodes.find { _1.path.basename.to_s == "c" }
        end
      end
    end
  end
end
