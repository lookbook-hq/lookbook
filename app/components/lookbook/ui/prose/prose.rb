module Lookbook
  module UI
    class Prose < BaseComponent
      def initialize(markdown: true, **kwargs)
        @markdown = markdown
      end

      def markdown? = @markdown
    end
  end
end
