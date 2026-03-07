# frozen_string_literal: true

require "literal"
require "active_support"
require "active_support/core_ext"
require "yard"

module Lookbook
  module Core
    Loader = Zeitwerk::Loader.new

    Loader.push_dir("#{__dir__}/core", namespace: Lookbook::Core)
    Loader.collapse("#{__dir__}/core/{content,issues,nodes,visitors}")
    Loader.collapse("#{__dir__}/core/{content,issues,nodes,visitors}/*")
    Loader.collapse("#{__dir__}/core/yard/concerns")
    Loader.ignore("#{__dir__}/core/version.rb")
    Loader.inflector.inflect("yard" => "YARD")
    Loader.setup

    Loader.eager_load_dir("#{__dir__}/core/nodes") # `Lookbook::Core::Node#subclasses`
    Loader.eager_load_dir("#{__dir__}/core/yard") # `Lookbook::Core::YARD::Tag#subclasses`

    class << self
      delegate :analyze, :update, to: Analyzer

      def version
        Lookbook::Core::VERSION
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
end
