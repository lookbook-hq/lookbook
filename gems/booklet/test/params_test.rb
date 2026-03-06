require "support/test_helper"

module Booklet
  class ParamsTest < Minitest::Test
    context "Params" do
      context "value casting" do
        context "symbol types" do
          setup do
            @explicit_type = Param.new(:explicit, value_type: :symbol)
            @inferred_type = Param.new(:inferred, default_value: :this_is_the_default)
          end

          should "correctly return the value type as symbol" do
            assert_equal :symbol, @explicit_type.value_type
            assert_equal :symbol, @inferred_type.value_type
          end

          should "correctly cast string values to a symbol" do
            assert_equal :foo, @explicit_type.cast_value("foo")
            assert_equal :bar, @inferred_type.cast_value("bar")
          end
        end
      end
    end
  end
end
