require "bundler/setup"

load "lib/tasks/lookbook_tasks.rake"
load "rails/tasks/statistics.rake"

require "bundler/gem_tasks"
require "standard/rake"

task :spec do
  sh "bundle exec appraisal rspec"
end

task default: :spec
