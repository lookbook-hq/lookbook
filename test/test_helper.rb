ENV["RAILS_ENV"] ||= "test"

require_relative "../test/dummy/config/environment"
require "minitest/hooks"
require "minitest/reporters"
require "minitest/autorun"
require "rails"
require "rails/test_help"

Minitest::Reporters.use!

class ActiveSupport::TestCase
  extend Minitest::Spec::DSL
end

# Load fixtures from the engine
if ActiveSupport::TestCase.respond_to?(:fixture_paths=)
  ActiveSupport::TestCase.fixture_paths = [File.expand_path("fixtures", __dir__)]
  ActionDispatch::IntegrationTest.fixture_paths = ActiveSupport::TestCase.fixture_paths
  ActiveSupport::TestCase.file_fixture_path = File.expand_path("fixtures", __dir__) + "/files"
  ActiveSupport::TestCase.fixtures :all
end
