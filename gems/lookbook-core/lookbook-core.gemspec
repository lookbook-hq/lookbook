# frozen_string_literal: true

require_relative "lib/lookbook/version"

Gem::Specification.new do |spec|
  spec.name = "lookbook-core"
  spec.version = Lookbook::VERSION
  spec.authors = ["Mark Perkins"]
  spec.homepage = "https://github.com/lookbook-hq/lookbook"
  spec.summary = "Parser-analyzer engine for Lookbook and Lookbook-adjacent tooling"
  spec.license = "MIT"

  spec.files = Dir["lib/**/*", "LICENSE.txt", "README.md"]
  spec.require_paths = ["lib"]

  # spec.metadata = {"rubygems_mfa_required" => "true"}

  spec.required_ruby_version = ">= 3.2"

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
