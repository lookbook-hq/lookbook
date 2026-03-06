require "support/test_helper"

module Booklet
  class HashConverterTest < Minitest::Test
    context "hash converter" do
      setup do
        @result = analyze_fixture("mixed")
        @hash = @result.accept(HashConverter.new)
      end

      should "not mutate the visited tree" do
        assert_kind_of FolderNode, @result.root
      end

      should "return a hash with the expected number of (nested) items" do
        assert_kind_of Hash, @hash
        assert_equal @result.count, TestUtils.flatten_tree_hash(@hash).size
      end

      should "be nested to match the heirarchy of nodes in the tree" do
        @result.each_node do |node|
          ancestor_refs = (node.ancestors || []).reverse.map(&:ref)
          ancestor_refs.shift # ignore root node
          current = @hash
          while ancestor_refs.any?
            ref = ancestor_refs.shift
            entry = current[:children].find { _1[:ref] == ref }
            assert entry
            current = entry
          end
        end
      end

      context "with props option as an array of prop names" do
        setup do
          @props = [:path, :depth]
          @hash = @result.accept(HashConverter.new(props: @props))
        end

        should "be present in each hash" do
          hash_entries = TestUtils.flatten_tree_hash(@hash)

          hash_entries.each do |entry|
            node = @result.find { _1.ref == entry[:ref] }

            @props.each { assert entry[_1] == node.public_send(_1) }
          end
        end

        context "with props option as a props hash" do
          setup do
            @props = {path: true, derived: lambda { |node| node.path&.basename }}
            @hash = @result.accept(HashConverter.new(props: @props))
          end

          should "be present in each hash" do
            hash_entries = TestUtils.flatten_tree_hash(@hash)

            hash_entries.each do |entry|
              node = @result.find { _1.ref == entry[:ref] }

              if node.locatable?
                assert_equal entry[:path], node.path
                assert_equal entry[:derived], node.path&.basename
              else
                assert_nil entry[:path]
                assert_nil entry[:derived]
              end
            end
          end
        end
      end
    end
  end
end
