require "support/test_helper"

module Lookbook::Core
  class GlobalConfigTest < Minitest::Test
    context "Lookbook::Core global config options" do
      setup do
        @original_loader = Lookbook::Core.loader
        @original_visitors = Lookbook::Core.visitors.dup
      end

      teardown do
        Lookbook::Core.loader = @original_loader
        Lookbook::Core.visitors.replace(@original_visitors)
      end

      context "Lookbook::Core::loader" do
        should "returns the entity loader" do
          assert Lookbook::Core.loader == EntityLoader
        end

        should "be able to be replaced" do
          Lookbook::Core.loader = EntityLoader.new

          assert_kind_of EntityLoader, Lookbook::Core.loader
        end
      end

      context "Lookbook::Core::visitors" do
        should "returns a array of entity visitors" do
          assert_kind_of Array, Lookbook::Core.visitors
          assert Lookbook::Core.visitors.count > 0

          Lookbook::Core.visitors.flatten.each do |visitor|
            assert Class, visitor
            assert visitor < Visitor
          end
        end

        should "be able to be mutated" do
          count = Lookbook::Core.visitors.count
          Lookbook::Core.visitors.push(HashConverter)

          assert Lookbook::Core.visitors.count == count + 1
          assert Lookbook::Core.visitors.include?(HashConverter)
        end
      end
    end
  end
end
