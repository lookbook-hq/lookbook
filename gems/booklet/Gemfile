source "https://rubygems.org"

gemspec

group :development, :test do
  gem "rake"

  gem "standard"
  gem "rubocop"

  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "puts_debuggerer"
  gem "pretty_please"

  gem "view_component"
  gem "phlex"
end

group :test do
  gem "minitest"
  gem "minitest-reporters"
  gem "shoulda-context"
  gem "simplecov", require: false
end
