require "active_support/dependencies/autoload"
require "lookbook/engine"

module Lookbook
  extend ActiveSupport::Autoload

  autoload :Parser, "lookbook/parser"
  autoload :Preview, "lookbook/preview"
  autoload :PreviewExample, "lookbook/preview_example"
  autoload :Navigation, "lookbook/navigation"
end
