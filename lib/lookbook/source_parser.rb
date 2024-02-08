require "yard"

module Lookbook
  class SourceParser
    def initialize(log_level: YARD::Logger::ERROR)
      @log_level = log_level
      @after_parse_callbacks = []
      @parsing = false

      YARD::Parser::SourceParser.after_parse_list { after_parse }
    end

    def parse(paths, &block)
      unless @parsing
        @parsing = true
        @after_parse_callbacks << block if block

        YARD::Logger.instance.enter_level(@log_level) do
          YARD::Registry.clear
          YARD.parse(paths)
        end
      end
    end

    private

    def parsed_classes
      YARD::Registry.all(:class)
    end

    def after_parse
      @after_parse_callbacks.each { |cb| cb.call(parsed_classes) }
      @after_parse_callbacks = []
      @parsing = false
    end
  end
end
