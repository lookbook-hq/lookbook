require "simplecov"
SimpleCov.start

require "minitest/autorun"
require "shoulda-context"

require "pretty_please"
require "pd"

require "booklet"

require_relative "fixtures"
require_relative "test_utils"

Minitest::Test.include(TestUtils)

PutsDebuggerer.header = "-" * 80
PutsDebuggerer.print_engine = lambda do |object|
  output = case object
  when String
    object
  else
    PrettyPlease.prettify(object)
  end
  puts output
end
