require "support/test_helper"

module Booklet
  class GlobalConfigTest < Minitest::Test
    context "Booklet global config options" do
      setup do
        @original_loader = Booklet.loader
        @original_visitors = Booklet.visitors.dup
      end

      teardown do
        Booklet.loader = @original_loader
        Booklet.visitors.replace(@original_visitors)
      end

      context "Booklet::loader" do
        should "returns the entity loader" do
          assert Booklet.loader == EntityLoader
        end

        should "be able to be replaced" do
          Booklet.loader = EntityLoader.new

          assert_kind_of EntityLoader, Booklet.loader
        end
      end

      context "Booklet::visitors" do
        should "returns a array of entity visitors" do
          assert_kind_of Array, Booklet.visitors
          assert Booklet.visitors.count > 0

          Booklet.visitors.flatten.each do |visitor|
            assert Class, visitor
            assert visitor < Visitor
          end
        end

        should "be able to be mutated" do
          count = Booklet.visitors.count
          Booklet.visitors.push(HashConverter)

          assert Booklet.visitors.count == count + 1
          assert Booklet.visitors.include?(HashConverter)
        end
      end
    end
  end
end
