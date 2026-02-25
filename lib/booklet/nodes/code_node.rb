module Booklet
  class CodeNode < Node
    prop :raw, String, :positional, reader: :protected

    prop :lang, Symbol, reader: :public, default: :plaintext

    prop :location, _Nilable(SourceLocation), reader: :public do |value|
      if value.is_a?(Array)
        SourceLocation.new(*value)
      elsif value.is_a?(String) || value.is_a?(Pathname)
        SourceLocation.new(value)
      end
    end

    def ref = Helpers.hexdigest(raw)

    def to_snippet
      Booklet.highlight(raw, lang)
    end

    public alias_method :to_s, :raw
    public alias_method :to_str, :raw

    class << self
      def extract_method_body(source)
        source
          .strip_heredoc
          .sub(/^def \w+\s?(\([^)]+\))?/m, "").split("\n")[0..-2].join("\n")
          .strip_heredoc
      end
    end
  end
end
