# frozen_string_literal: true

appraise "rails-6.1" do
  gem "rails", "~> 6.1"

  # Required for Ruby 3.1.0
  gem "net-smtp", require: false
  gem "net-imap", require: false
  gem "net-pop", require: false

  gem "view_component", "3.23.2"

  # ActiveSupport 6.1 passes `quirks_mode` to `JSON.generate`, which json 3 rejects
  # (unknown options raise since 3.0). Rails 6.1 is EOL, so this won't be fixed upstream.
  gem "json", "< 3"
end

appraise "rails-7.0" do
  gem "rails", "~> 7.0"
  gem "view_component", "3.23.2"
end

appraise "rails-7.1" do
  gem "rails", "~> 7.1"
  gem "view_component", "4.0.0.alpha6"
end

appraise "rails-7.2" do
  gem "rails", "~> 7.2"
  gem "view_component", "4.0.0.alpha6"
end

appraise "rails-8.0" do
  gem "rails", "~> 8.0"
  gem "view_component", "4.0.0.alpha6"

  # ActiveSupport 8.0.5.1 passes `quirks_mode` to `JSON.generate`, which json 3 rejects
  # (unknown options raise since 3.0). Fixed on 8-0-stable: remove once a newer 8.0 release is out.
  gem "json", "< 3"
end

# appraise "rails-head" do
#   gem "rails", github: "rails/rails", branch: "main"
#   gem "rspec-rails", "~> 6"
# end
