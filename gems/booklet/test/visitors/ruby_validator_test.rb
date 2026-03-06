require "support/test_helper"
require "prism"

module Booklet
  class RubyValidatorTest < Minitest::Test
    context "ruby file syntax validator" do
      setup do
        @result = analyze_fixture("mixed", visitors: [RubyValidator.new])
        @ruby_files_with_errors = Fixtures.files_within("mixed", grep: /syntax_error/)
      end

      should "identify all files with syntax errors" do
        nodes_with_errors = @result.filter(&:errors?)

        assert_equal @ruby_files_with_errors.count, nodes_with_errors.count
      end
    end
  end
end
