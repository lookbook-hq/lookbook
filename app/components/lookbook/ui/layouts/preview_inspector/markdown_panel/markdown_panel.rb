module Lookbook
  module UI
    class MarkdownPanel < BaseComponent
      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end
    end
  end
end
