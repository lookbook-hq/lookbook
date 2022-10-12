require "yard"

module Lookbook
  class Parser
    attr_reader :registry_path
    def initialize(paths)
      @paths = paths.map { |p| "#{p}/**/*preview.rb" }
      @after_parse_callbacks = []
      @after_parse_once_callbacks = []
      @parsing = false

      YARD::Parser::SourceParser.after_parse_list do
        [*@after_parse_callbacks, *@after_parse_once_callbacks].each do |callback|
          callback.call(YARD::Registry)
        end
        @after_parse_once_callbacks = []
        @parsing = false
      end
    end

    def parse(&block)
      unless @parsing
        @parsing = true
        @after_parse_once_callbacks << block if block
        YARD::Registry.clear
        YARD.parse(@paths)
      end
    end

    def after_parse(&block)
      @after_parse_callbacks << block
    end

    class << self
      def define_tags(tags = nil)
        tags.to_h.each do |name, tag|
          YARD::Tags::Library.define_tag(tag[:label], name, tag[:yard_parser])
        end
      end
    end
  end
end
