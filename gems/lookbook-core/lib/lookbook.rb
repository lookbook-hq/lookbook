# frozen_string_literal: true

require "zeitwerk"
require "literal"
require "active_support"
require "active_support/core_ext"
require "yard"

require "lookbook/logger"

Zeitwerk::Loader.for_gem.tap do |loader|
  loader.ignore File.join(__dir__, "lookbook-core.rb")

  loader.collapse("#{__dir__}/lookbook/{content,issues,nodes,visitors}")
  loader.collapse("#{__dir__}/lookbook/{content,issues,nodes,visitors}/*")
  loader.collapse("#{__dir__}/lookbook/yard/concerns")
  loader.ignore("#{__dir__}/lookbook/{logger}.rb")
  loader.inflector.inflect("yard" => "YARD")
  loader.enable_reloading if ENV["LOOKBOOK_ENV"] == "development"
  loader.setup

  loader.eager_load_dir("#{__dir__}/lookbook/nodes") # `Lookbook::Node#subclasses`
  loader.eager_load_dir("#{__dir__}/lookbook/yard") # `Lookbook::YARD::Tag#subclasses`
end

module Lookbook
  class << self
    delegate :analyze, :update, to: Analyzer

    def version
      Lookbook::VERSION
    end

    def config
      Config.current
    end

    def configure
      yield config
    end

    def env
      @env ||= ActiveSupport::EnvironmentInquirer.new(ENV["LOOKBOOK_ENV"] || "production")
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

  logger.info(["Lookbook version", Lookbook.version])
  logger.info(["Lookbook log level", Logger.level_as_string(logger.level)])
  logger.info(["Lookbook environment", Lookbook.env])
end
