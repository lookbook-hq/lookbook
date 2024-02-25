module Lookbook
  module UI
    class PreviewPanel < BaseComponent
      attr_reader :id, :src

      def initialize(id:, src:, **kwargs)
        @id = id
        @src = src
      end
    end
  end
end
