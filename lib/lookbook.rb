require "active_support/dependencies/autoload"
require "lookbook/engine"
require "lookbook/version"

module Lookbook
  extend ActiveSupport::Autoload

  autoload :Lang, "lookbook/lang"
  autoload :Params, "lookbook/params"
  autoload :Page, "lookbook/page"
  autoload :Features, "lookbook/features"
  autoload :Collection, "lookbook/collection"
  autoload :Parser, "lookbook/parser"
  autoload :Preview, "lookbook/preview"
  autoload :PreviewController, "lookbook/preview_controller"
  autoload :PreviewExample, "lookbook/preview_example"
  autoload :PreviewGroup, "lookbook/preview_group"
  autoload :Taggable, "lookbook/taggable"
  autoload :NullLogger, "lookbook/null_logger"
  autoload :CodeFormatter, "lookbook/code_formatter"
end
