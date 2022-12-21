module Lookbook
  # @api private
  module LocatableEntity
    extend ActiveSupport::Concern

    included do
      attr_reader :file_path, :base_directories

      def file_name(strip_ext = false)
        basename = file_pathname.basename
        (strip_ext ? basename.to_s.split(".").first : basename).to_s
      end

      def file_name_base
        @_file_name_slug ||= file_name(true).gsub(/(_component_preview|component_preview|preview)$/, "")
      end

      def file_extension
        @_file_extension ||= file_pathname.extname
      end

      def directory_path
        @_directory_path ||= Pathname(file_pathname.dirname)
      end

      def relative_file_path
        @_relative_file_path ||= file_pathname.relative_path_from(base_directory)
      end

      def relative_directory_path
        @_relative_directory_path ||= directory_path.relative_path_from(base_directory)
      end

      def last_modified
        @_last_modified ||= File.mtime(file_path)
      end

      def logical_path
        return @_logical_path if @_logical_path

        directory = fetch_config(:logical_path) { relative_directory_path.to_s }
        @_logical_path ||= PathUtils.to_path(directory, file_name_base)
      end

      protected

      def file_pathname
        Pathname(file_path)
      end

      def base_directory
        return @_base_directory if @_base_directory

        directories = Array(base_directories).map(&:to_s).sort_by { |path| path.split("/").size }.reverse
        @_base_directory ||= directories.find { |dir| file_path.to_s.start_with?(dir) }
      end
    end
  end
end
