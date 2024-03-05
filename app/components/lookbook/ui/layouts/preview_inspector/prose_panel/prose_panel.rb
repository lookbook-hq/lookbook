module Lookbook
  module UI
    class ProsePanel < BaseComponent
      attr_reader :id

      def initialize(id:, markdown: false, **kwargs)
        @id = id
        @markdown = markdown
      end

      def markdown? = @markdown
    end
  end
end
