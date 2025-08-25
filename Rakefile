require "bundler/setup"
require "bundler/gem_tasks"
require "standard/rake"
require "minitest/test_task"

Minitest::TestTask.create(:test) do |t|
  t.libs << "test"
  t.libs << "lib"
  t.warning = false
  t.test_globs = ["test/**/*_test.rb"]
end

task :spec do
  sh "bundle exec rspec"
end

task default: :spec
