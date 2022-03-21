require "active_support/dependencies/autoload"
require "lookbook/engine"
require "lookbook/version"

module Lookbook
  extend ActiveSupport::Autoload

  autoload :Utils, "lookbook/utils"
  autoload :Lang, "lookbook/lang"
  autoload :Params, "lookbook/params"
  autoload :Page, "lookbook/page"
  autoload :PageCollection, "lookbook/page_collection"
  autoload :Features, "lookbook/features"
  autoload :Collection, "lookbook/collection"
  autoload :Parser, "lookbook/parser"
  autoload :Preview, "lookbook/preview"
  autoload :PreviewCollection, "lookbook/preview_collection"
  autoload :PreviewController, "lookbook/preview_controller"
  autoload :PreviewExample, "lookbook/preview_example"
  autoload :PreviewGroup, "lookbook/preview_group"
  autoload :CodeInspector, "lookbook/code_inspector"
  autoload :NullLogger, "lookbook/null_logger"
  autoload :CodeFormatter, "lookbook/code_formatter"
  autoload :Markdown, "lookbook/markdown"

  class << self
    include Utils

    def previews
      Preview.all
    end

    def pages
      Page.all
    end
  end
end
