require "support/test_helper"

module Booklet
  class AnalyzeTest < Minitest::Test
    context "Booklet::analyze" do
      context "with default visitors" do
        setup do
          @root = Fixtures.dir("mixed")
          @result = analyze_fixture("mixed")
        end

        should "return an booklet entity tree" do
          assert_kind_of EntityTree, @result
        end

        context "Tree#files" do
          should "return an array of Pathnames representing all expected files and folders" do
            assert_kind_of Array, @result.files

            assert_equal(
              Fixtures.files_within(@root).count,
              @result.files.count { _1 != @root } # @result.files includes the root directory, files_within doesn't.
            )
          end
        end

        context "Tree#issues" do
          should "be an issue log instance" do
            assert_kind_of Issues, @result.issues
          end

          should "include issues collected from all nodes in the tree" do
            files_with_errors = Fixtures.files_within(@root, grep: /_error/)
            assert_equal files_with_errors.size, @result.errors.group_by { _1.node }.count
          end
        end

        context "Tree#to_h" do
          setup do
            @hash = @result.to_h
          end

          should "convert the tree to a hash" do
            assert_kind_of Hash, @hash
          end
        end

        context "entity conversion" do
          context "FolderNode" do
            should "be created for each directory node" do
              dirs = Fixtures.files_within(@root).filter(&:directory?)
              folders = @result.grep(FolderNode).reject(&:root?)

              assert_nodes_match_files folders, dirs
            end
          end

          context "SpecNode" do
            should "be created for each preview class" do
              assert_nodes_match_files @result.grep(SpecNode), Fixtures.spec_files_within(@root)
            end
          end

          context "PageNode" do
            should "be created for each matching markdown file" do
              assert_nodes_match_files @result.grep(PageNode), Fixtures.markdown_files_within(@root)
            end
          end

          context "AssetNode" do
            should "be created from each asset file" do
              assert_nodes_match_files @result.grep(AssetNode), Fixtures.asset_files_within(@root)
            end
          end

          context "FileNode" do
            should "be created from all other files" do
              assert_nodes_match_files @result.grep(FileNode), Fixtures.anon_files_within(@root)
            end
          end
        end
      end
    end
  end
end
