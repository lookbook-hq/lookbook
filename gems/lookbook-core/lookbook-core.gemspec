# frozen_string_literal: true

lookbook = Gem::Specification.load File.expand_path("../lookbook/lookbook.gemspec", __dir__)

Gem::Specification.new do |spec|
  spec.name = "lookbook-core"
  spec.summary = "Lookbook parser-analyzer engine"

  spec.version = lookbook.version
  spec.authors = lookbook.authors
  spec.homepage = lookbook.homepage
  spec.license = lookbook.license
  spec.required_ruby_version = lookbook.required_ruby_version

  spec.files = Dir["lib/**/*", "README.md"]
  spec.require_paths = lookbook.require_paths

  spec.add_dependency "activesupport", ">= 7.2"
  spec.add_dependency "activemodel", ">= 7.2"
  spec.add_dependency "rouge", ">= 4.5"
  spec.add_dependency "commonmarker", "~> 2.2"
  spec.add_dependency "fast_ignore", "~> 0.17"
  spec.add_dependency "herb", "~> 0.8"
  spec.add_dependency "literal", "~> 1.8"
  spec.add_dependency "marcel", ">= 1.0"
  spec.add_dependency "yard", "~> 0.9"
  spec.add_dependency "zeitwerk", "~> 2.7"
end
