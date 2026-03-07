lookbook = Gem::Specification.load File.expand_path("../lookbook/lookbook.gemspec", __dir__)

Gem::Specification.new do |spec|
  spec.name = "lookbook-rails"
  spec.summary = "A UI development environment for Ruby on Rails applications"

  spec.version = lookbook.version
  spec.authors = lookbook.authors
  spec.homepage = lookbook.homepage
  spec.license = lookbook.license
  spec.required_ruby_version = lookbook.required_ruby_version

  spec.files = Dir["{app,config,lib,public}/**/*", "README.md"]
  spec.require_paths = lookbook.require_paths

  spec.add_dependency "lookbook-core", lookbook.version
  spec.add_dependency "literal", "~> 1.8"
  spec.add_dependency "railties", ">= 7.2"
  spec.add_dependency "zeitwerk", "~> 2.7"
end
