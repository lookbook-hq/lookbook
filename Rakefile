require "bundler/setup"

# APP_RAKEFILE = File.expand_path("test/dummy/Rakefile", __dir__)
load "lib/tasks/lookbook_tasks.rake"
load "rails/tasks/statistics.rake"

require "bundler/gem_tasks"
require "standard/rake"

begin
  require "rspec/core/rake_task"
  RSpec::Core::RakeTask.new(:spec)
  task default: :spec
rescue LoadError
end
