module LookbookDocs
  class Code::Component < Base
    attr_reader :lang

    def initialize(lang: :html, **attrs)
      @lang = lang
      @attrs = attrs
    end

    def call
      markdown("```#{lang}\n#{content.strip_heredoc.strip.html_safe}\n```")
    end
  end
end
