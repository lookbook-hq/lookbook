module Lookbook
  module Languages
    class << self
      def guess(input, fallback_name = nil)
        match = languages.find { _1.matches?(input) }
        match || find(fallback_name)
      end

      def find(name)
        languages.find { _1.name == name.to_sym } if name
      end

      def comment(language_name, comment_text)
        find(language_name)&.comment(comment_text)
      end

      def method_missing(name, *args, &block)
        find(name) || raise(ArgumentError, "Method `#{name}` doesn't exist.")
      end

      def respond_to_missing?(name, include_private = false)
        !!find(name) || super
      end

      private

      def languages
        @languages ||= Lookbook.config.languages.map do |name, opts|
          Language.new(name, **opts)
        end
      end
    end
  end
end
