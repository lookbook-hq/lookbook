module Lookbook
  module UI
    class CodePanel < BaseComponent
      attr_reader :lang

      def initialize(lang:, **kwargs)
        @lang = lang
      end
    end
  end
end
