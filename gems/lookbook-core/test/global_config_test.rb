require "support/test_helper"

module Lookbook
  class GlobalConfigTest < Minitest::Test
    context "Lookbook global config options" do
      setup do
        @original_loader = Lookbook.loader
        @original_visitors = Lookbook.visitors.dup
      end

      teardown do
        Lookbook.loader = @original_loader
        Lookbook.visitors.replace(@original_visitors)
      end

      context "Lookbook::loader" do
        should "returns the entity loader" do
          assert Lookbook.loader == EntityLoader
        end

        should "be able to be replaced" do
          Lookbook.loader = EntityLoader.new

          assert_kind_of EntityLoader, Lookbook.loader
        end
      end

      context "Lookbook::visitors" do
        should "returns a array of entity visitors" do
          assert_kind_of Array, Lookbook.visitors
          assert Lookbook.visitors.count > 0

          Lookbook.visitors.flatten.each do |visitor|
            assert Class, visitor
            assert visitor < Visitor
          end
        end

        should "be able to be mutated" do
          count = Lookbook.visitors.count
          Lookbook.visitors.push(HashConverter)

          assert Lookbook.visitors.count == count + 1
          assert Lookbook.visitors.include?(HashConverter)
        end
      end
    end
  end
end
