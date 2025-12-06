require "lookbook_test"

module Lookbook
  class ArtifactTreeTest < LookbookTest
    let(:file_tree) { FileTree.new(file_fixture("trees/artifacts")) }
    let(:artifact_tree) { ArtifactTree.new(file_tree) }

    test "loads all files from the source directory" do
      assert_equal 9, artifact_tree.descendants.size
    end

    # test "has the expected tree structure" do
  end
end
