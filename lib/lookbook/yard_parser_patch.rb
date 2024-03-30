module Lookbook
  module YardParserPatch
    def on_parse_error(msg)
      error = ParserError.new("syntax error in `#{file}`:(#{lineno},#{column}): #{msg}")
      Engine.notifications.add(error)
      super
    end
  end
end
