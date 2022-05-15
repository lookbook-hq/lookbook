$:.push File.expand_path("lib", __dir__)

require "lookbook/version"

Gem::Specification.new do |spec|
  spec.name = "lookbook"
  spec.version = Lookbook::VERSION
  spec.authors = ["Mark Perkins"]
  spec.homepage = "https://github.com/allmarkedup/lookbook"
  spec.summary = "A native development UI for ViewComponent"
  spec.license = "MIT"

  spec.files = Dir["{app,config,lib,public}/**/*", "LICENSE.txt", "README.md"]
  spec.require_paths = ["lib"]

  spec.add_dependency "actioncable"
  spec.add_dependency "railties", ">= 5.0"
  spec.add_dependency "view_component", "~> 2.0"
  spec.add_dependency "redcarpet", "~> 3.5"
  spec.add_dependency "rouge", "~> 3.26"
  spec.add_dependency "listen", "~> 3.0"
  spec.add_dependency "yard", "~> 0.9.25"
  spec.add_dependency "htmlbeautifier", "~> 1.3"

  spec.add_development_dependency "sqlite3", "~> 1.4"
  spec.add_development_dependency "shoulda", "~> 4.0"
  spec.add_development_dependency "warning", "~> 1.2"
  spec.add_development_dependency "standard", "~> 1.1"
  spec.add_development_dependency "capybara", "~> 3.3"
  spec.add_development_dependency "foreman"
end
