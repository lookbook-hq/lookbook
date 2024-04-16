module Lookbook
  module UI
    class ErrorPage < BaseComponent
      attr_reader :error, :title

      def initialize(error:, title: nil, **kwargs)
        @error = error
        @title = title
      end
    end
  end
end
