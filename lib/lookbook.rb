require "active_support/dependencies/autoload"
require "lookbook/engine"

module Lookbook
  extend ActiveSupport::Autoload

  autoload :Parser, "lookbook/parser"
  autoload :Parsable, "lookbook/parsable"
  autoload :Preview, "lookbook/preview"
  autoload :PreviewExample, "lookbook/preview_example"
  autoload :PreviewController, "lookbook/preview_controller"
  autoload :Navigation, "lookbook/navigation"
end
