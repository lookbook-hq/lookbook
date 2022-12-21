module Lookbook
  # @api private
  module InspectableEntity
    extend ActiveSupport::Concern

    included do
      def source
        source_code = if custom_source?
          File.read(source_file_path)
        else
          src = CodeIndenter.call(code_object.source)
          begin
            send(:format_source, src)
          rescue NoMethodError
            src
          end
        end

        source_code.strip_heredoc.strip
      end

      def source_lang
        custom_source? ? Lang.guess(source_file_path, :ruby) : Lang.find(:ruby)
      end

      def custom_source?
        source_file_path.present?
      end

      protected

      attr_reader :code_object

      def source_file_path
        @_source_path ||= if code_object.has_tag?(:source)
          source_path = code_object.tag(:source).value
          unless source_path.present? && File.exist?(source_path)
            raise LookbookError, "Could not find source file '#{source_path}'"
          end
          source_path
        end
      end
    end
  end
end
