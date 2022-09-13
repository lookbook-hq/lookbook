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
      def define_tags(custom = {})
        YARD::Tags::Library.define_tag("Hidden status", :hidden)
        YARD::Tags::Library.define_tag("Label", :label)
        YARD::Tags::Library.define_tag("Display", :display)
        YARD::Tags::Library.define_tag("Position", :position)
        YARD::Tags::Library.define_tag("ID", :id)
        YARD::Tags::Library.define_tag("Component", :component)
        custom.each do |name, opts|
          YARD::Tags::Library.define_tag(name.to_s.titleize, name)
        end
      end
    end
  end
end
