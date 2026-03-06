require "support/test_helper"

module Booklet
  class ParamSetTest < Minitest::Test
    context "ParamSet" do
      setup do
        @param_set = ParamSet.new
      end

      context "#push" do
        should "add params" do
          param = Param.new(:name, default_value: "test")
          @param_set.push(param)

          assert_equal 1, @param_set.count
        end

        should "add multiple params" do
          params = [Param.new(:name), Param.new(:size)]
          @param_set.push(params)

          assert_equal 2, @param_set.count
        end
      end

      context "#find!" do
        should "find param by name" do
          param = Param.new(:name, default_value: "test")
          @param_set.push(param)

          found = @param_set.find!(:name)
          assert_equal :name, found.name
        end

        should "raise for unknown param" do
          assert_raises { @param_set.find!(:nonexistent) }
        end
      end

      context "#to_values_hash" do
        should "build hash with cast values and defaults" do
          @param_set.push(Param.new(:name, default_value: "default_name"))
          @param_set.push(Param.new(:size, default_value: :medium))

          result = @param_set.to_values_hash({name: "custom"})

          assert_equal "custom", result[:name]
          assert_equal :medium, result[:size]
        end

        should "use defaults when no values provided" do
          @param_set.push(Param.new(:name, default_value: "default_name"))

          result = @param_set.to_values_hash({})

          assert_equal "default_name", result[:name]
        end
      end

      context "#update" do
        should "update param properties" do
          @param_set.push(Param.new(:name, default_value: "test"))

          @param_set.update(:name, {description: "A description"})

          param = @param_set.find!(:name)
          assert_equal "A description", param.description
        end
      end

      context "Enumerable" do
        should "support iteration" do
          @param_set.push(Param.new(:a), Param.new(:b))

          names = @param_set.map(&:name)
          assert_equal [:a, :b], names
        end
      end
    end
  end
end
