module Lookbook
  module UI
    class ProsePanel < BaseComponent
      def initialize(markdown: true, **kwargs)
        @markdown = markdown
      end

      def markdown? = @markdown
    end
  end
end
