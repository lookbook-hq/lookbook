core = Gem::Specification.load File.expand_path("../lookbook-core/lookbook-core.gemspec", __dir__)

Gem::Specification.new do |spec|
  spec.name = "lookbook-rails"
  spec.summary = "A UI development environment for Ruby on Rails applications"

  spec.version = core.version
  spec.authors = core.authors
  spec.homepage = core.homepage
  spec.license = core.license
  spec.required_ruby_version = core.required_ruby_version

  spec.files = Dir["{app,config,lib,public}/**/*", "LICENSE.txt", "README.md"]
  spec.require_paths = core.require_paths

  spec.add_dependency "lookbook-core", core.version
  spec.add_dependency "literal", "~> 1.8"
  spec.add_dependency "railties", ">= 7.2"
  spec.add_dependency "zeitwerk", "~> 2.7"
end
