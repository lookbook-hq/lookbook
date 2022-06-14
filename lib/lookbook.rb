require "active_support/dependencies/autoload"
require "lookbook/engine"
require "lookbook/version"
require "view_component/engine"

module Lookbook
  extend ActiveSupport::Autoload

  autoload :Error, "lookbook/error"
  autoload :Utils, "lookbook/utils"
  autoload :Lang, "lookbook/lang"
  autoload :Params, "lookbook/params"
  autoload :Page, "lookbook/page"
  autoload :PageCollection, "lookbook/page_collection"
  autoload :Features, "lookbook/features"
  autoload :Collection, "lookbook/collection"
  autoload :Entity, "lookbook/entity"
  autoload :Parser, "lookbook/parser"
  autoload :Preview, "lookbook/preview"
  autoload :PreviewCollection, "lookbook/preview_collection"
  autoload :PreviewController, "lookbook/preview_controller"
  autoload :PreviewExample, "lookbook/preview_example"
  autoload :PreviewGroup, "lookbook/preview_group"
  autoload :SourceInspector, "lookbook/source_inspector"
  autoload :CodeFormatter, "lookbook/code_formatter"
  autoload :Markdown, "lookbook/markdown"
  autoload :Theme, "lookbook/theme"
  autoload :Store, "lookbook/store"

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
