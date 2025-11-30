source "https://rubygems.org"

gemspec

rails_version = (ENV["RAILS_VERSION"] || "~> 8.1.0").to_s
gem "rails", (rails_version == "main") ? {git: "https://github.com/rails/rails", ref: "main"} : rails_version

gem "debug", platforms: %i[mri windows], require: "debug/prelude"
gem "propshaft"
gem "puma"
gem "standard"
gem "rubocop"
gem "yard-activesupport-concern"

gem "listen"
gem "view_component"
gem "phlex-rails"

group :test do
  gem "appraisal"
  gem "cuprite"
  gem "minitest-hooks"
  gem "minitest-reporters"
  gem "sqlite3"
end
