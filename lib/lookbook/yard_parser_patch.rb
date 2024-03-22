module Lookbook
  module YardParserPatch
    def on_parse_error(msg)
      Previews.parser.record_error(ParserError.new("syntax error in `#{file}`:(#{lineno},#{column}): #{msg}"))
      super
    end
  end
end
