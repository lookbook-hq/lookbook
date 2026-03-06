require "support/test_helper"

module Booklet
  class IssuesTest < Minitest::Test
    context "Issues" do
      setup do
        @node = Node.new
        @issues = Issues.new
      end

      context "#add" do
        should "add Issue instances" do
          warning = Warning.new("test warning", node: @node)
          @issues.add(warning)

          assert_equal 1, @issues.count
        end

        should "reject non-Issue objects" do
          assert_raises(ArgumentError) { @issues.add("not an issue") }
        end

        should "support << alias" do
          warning = Warning.new("test warning", node: @node)
          @issues << warning

          assert_equal 1, @issues.count
        end
      end

      context "#warnings" do
        should "filter by warning type" do
          @issues << Warning.new("warn 1", node: @node)
          @issues << Error.new("err 1", node: @node)
          @issues << Warning.new("warn 2", node: @node)

          assert_equal 2, @issues.warnings.count
          @issues.warnings.each { assert_kind_of Warning, _1 }
        end
      end

      context "#errors" do
        should "filter by error type" do
          @issues << Warning.new("warn 1", node: @node)
          @issues << Error.new("err 1", node: @node)
          @issues << Error.new("err 2", node: @node)

          assert_equal 2, @issues.errors.count
          @issues.errors.each { assert_kind_of Error, _1 }
        end
      end

      context "#warnings?" do
        should "return true when warnings exist" do
          @issues << Warning.new("warn", node: @node)
          assert @issues.warnings?
        end

        should "return false when no warnings" do
          @issues << Error.new("err", node: @node)
          refute @issues.warnings?
        end
      end

      context "#errors?" do
        should "return true when errors exist" do
          @issues << Error.new("err", node: @node)
          assert @issues.errors?
        end

        should "return false when no errors" do
          @issues << Warning.new("warn", node: @node)
          refute @issues.errors?
        end
      end

      context "#clear" do
        should "empty the collection" do
          @issues << Warning.new("warn", node: @node)
          @issues << Error.new("err", node: @node)

          assert_equal 2, @issues.count

          @issues.clear

          assert_equal 0, @issues.count
        end
      end

      context "Enumerable" do
        should "support iteration" do
          @issues << Warning.new("warn", node: @node)
          @issues << Error.new("err", node: @node)

          refs = @issues.map(&:message)
          assert_equal ["warn", "err"], refs
        end
      end
    end
  end
end
