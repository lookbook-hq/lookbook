require "support/test_helper"

module Booklet
  class LocatableTest < Minitest::Test
    context "locatable nodes" do
      setup do
        @locatable_class = Class.new(Node) do
          include Locatable
        end
      end

      context "instance methods" do
        setup do
          @fixture_file = Fixtures.file("mixed/overview.md")
          @node = @locatable_class.new(path: @fixture_file)
        end

        context "Locatable#path" do
          should "return the path as a pathname" do
            assert_equal @fixture_file, @node.path
            assert_kind_of Pathname, @node.path
          end
        end
      end
    end
  end
end
