require "simplecov"
SimpleCov.start "rails" do
  add_filter "/test/"
  add_filter "/test/dummy/"
end

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require_relative "../test/dummy/config/environment"
require "rails/test_help"
require "shoulda-context"
