require "test_helper"

class LookbookSystemTest < ActionDispatch::SystemTestCase
  extend Minitest::Spec::DSL
  include Capybara::DSL
  include LookbookTestUtils

  driven_by :cuprite
end
