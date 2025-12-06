require "lookbook_test"

module Lookbook
  class FileTreeTest < LookbookTest
    let(:tree) { FileTree.new(file_fixture("trees/files")) }

    test "loads all files from the source directory" do
      # assert_equal 8, tree.descendants.size
      assert_equal 4, tree.count(&:file?)
    end

    test "has the expected tree structure" do
      assert_equal tree.children.size, 2

      # a = tree.first_child
      # assert_equal "a", a.basename
      # assert a.directory?
      # assert_equal 2, a.children.size

      # aa = a.first_child
      # assert aa.directory?
      # assert_equal "aa", aa.basename

      # aaa = aa.first_child
      # assert aaa.file?
      # assert_equal "aaa.txt", aaa.basename

      # aab = aaa.next_sibling
      # assert_equal "aab.txt", aab.basename
      # assert_equal ".txt", aab.ext
      # assert aab.ext?(".txt")
      # refute aab.ext?(".foo")

      # b = tree.last_child
      # assert_equal "b", b.basename
      # assert b.directory?
      # assert_equal 1, b.children.size

      # bb = b.first_child
      # assert bb.file?
      # assert_equal "bb.txt", bb.basename

      # assert_equal "../fixtures/trees/files/b/bb.txt", bb.relpath.to_s
    end
  end
end
