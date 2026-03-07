core = Gem::Specification.load File.expand_path("../lookbook-core/lookbook-core.gemspec", __dir__)

Gem::Specification.new do |spec|
  spec.name = "lookbook"
  spec.summary = "Lookbook is a UI development environment for Ruby on Rails applications"

  spec.version = core.version
  spec.authors = core.authors
  spec.homepage = core.homepage
  spec.license = core.license
  spec.required_ruby_version = core.required_ruby_version

  spec.files = Dir["lib/**/*", "LICENSE.txt", "README.md"]
  spec.require_paths = core.require_paths

  spec.add_dependency "lookbook-rails", core.version
end
