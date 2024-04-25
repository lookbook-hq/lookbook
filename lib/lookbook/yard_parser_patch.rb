module Lookbook
  module YardParserPatch
    def on_parse_error(msg)
      error = ParserError.new("syntax error in `#{file}`:(#{lineno},#{column}): #{msg}")
      Previews.parser.error_paths << file
      Engine.notifications.add(:previews, error)
      super
    end
  end
end
