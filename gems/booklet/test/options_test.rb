require "support/test_helper"

module Booklet
  class OptionsTest < Minitest::Test
    context "Options::from" do
      context "nested hash" do
        setup do
          @hash = {hash_1: {hash_2: {string_1: "chunky"}}, array_1: [{hash_3: {string_2: "bacon"}}]}
          @options = Options.new(@hash)
        end

        should "return an Options instance" do
          assert_kind_of Options, @options
        end

        should "recursively convert nested hashes to Options objects" do
          assert_equal [:hash_1, :array_1], @options.keys

          assert_kind_of Options, @options.hash_1
          assert_kind_of Options, @options.hash_1.hash_2
          assert_equal "chunky", @options.hash_1.hash_2.string_1

          assert_kind_of Array, @options.array_1
          assert_kind_of Options, @options.array_1.first
          assert_kind_of Options, @options.array_1.first.hash_3
          assert_equal "bacon", @options.array_1.first.hash_3.string_2
        end
      end
    end
  end
end
