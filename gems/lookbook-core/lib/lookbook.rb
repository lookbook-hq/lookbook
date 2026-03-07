# frozen_string_literal: true

require "literal"
require "active_support"
require "active_support/core_ext"
require "yard"

module Lookbook
  Loader = Zeitwerk::Loader.new

  Loader.push_dir("#{__dir__}/lookbook", namespace: Lookbook)
  Loader.collapse("#{__dir__}/lookbook/{content,issues,nodes,visitors}")
  Loader.collapse("#{__dir__}/lookbook/{content,issues,nodes,visitors}/*")
  Loader.collapse("#{__dir__}/lookbook/yard/concerns")
  Loader.inflector.inflect("yard" => "YARD")
  Loader.setup

  Loader.eager_load_dir("#{__dir__}/lookbook/nodes") # `Lookbook::Node#subclasses`
  Loader.eager_load_dir("#{__dir__}/lookbook/yard") # `Lookbook::YARD::Tag#subclasses`

  class << self
    delegate :analyze, :update, to: Analyzer

    def version
      Lookbook::VERSION
    end

    def loader
      @loader ||= EntityLoader
    end

    def visitors
      @visitors ||= validator_visitors + spec_visitors + page_visitors
    end

    def validator_visitors
      [RubyValidator, HerbValidator]
    end

    def spec_visitors
      [PreviewClassParser, YardTagsHandler, ScenarioGrouper]
    end

    def page_visitors
      [FrontmatterExtractor]
    end

    def yard
      @yard ||= begin
        YARD::Parser.define_tags(YARD::Tag.subclasses)
        YARD::Parser.new
      end
    end

    def markdown
      @markdown ||= Markdown::Processor.new
    end

    def highlighter
      @highlighter ||= Syntax::Highlighter.new
    end

    delegate :highlight, to: :highlighter

    attr_writer :loader, :visitors, :validator_visitors, :spec_visitors, :page_visitors
  end
end
