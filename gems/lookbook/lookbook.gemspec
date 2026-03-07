require_relative "lib/lookbook/version"

Gem::Specification.new do |spec|
  spec.name = "lookbook"
  spec.summary = "A UI development environment for Ruby on Rails applications"
  spec.version = Lookbook::VERSION
  spec.authors = ["Mark Perkins"]
  spec.homepage = "https://github.com/lookbook-hq/lookbook"
  spec.license = "MIT"

  spec.required_ruby_version = ">= 3.2"

  spec.files = Dir["lib/*", "README.md"]
  spec.require_paths = ["lib"]
end
