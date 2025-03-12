$:.push File.expand_path("lib", __dir__)

require "lookbook/version"

Gem::Specification.new do |spec|
  spec.name = "lookbook"
  spec.version = Lookbook::VERSION
  spec.authors = ["Mark Perkins"]
  spec.homepage = "https://github.com/lookbook-hq/lookbook"
  spec.summary = "A UI development environment for Ruby on Rails applications"
  spec.license = "MIT"
  spec.metadata = {"rubygems_mfa_required" => "true"}

  spec.files = Dir["{app,config,lib,public}/**/*", "LICENSE.txt", "README.md"]
  spec.require_paths = ["lib"]

  spec.required_ruby_version = ">= 3.0.0"

  spec.add_dependency "css_parser"
  spec.add_dependency "redcarpet"
  spec.add_dependency "htmlbeautifier"
  spec.add_dependency "yard"
  spec.add_dependency "zeitwerk"
  spec.add_dependency "ostruct"
end
