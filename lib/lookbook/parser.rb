require "yard"

module Lookbook
  class Parser
    class << self
      def get_code_object(file_path, code_path)
        YARD::Registry.clear
        YARD::Parser::SourceParser.parse(file_path.to_s)
        YARD::Registry.at(code_path)
      end

      def define_tags
        YARD::Tags::Library.define_tag("Hidden status", :hidden)
      end
    end
  end
end
