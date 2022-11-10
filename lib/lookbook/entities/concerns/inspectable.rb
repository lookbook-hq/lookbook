module Lookbook
  module Inspectable
    extend ActiveSupport::Concern

    included do
      def source
        src = CodeIndenter.call(code_object.source)
        formatted = begin
          send(:format_source, src)
        rescue NoMethodError
          src
        end
        formatted.strip_heredoc.strip
      end

      protected

      attr_reader :code_object
    end
  end
end
