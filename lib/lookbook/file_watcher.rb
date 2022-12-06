module Lookbook
  class FileWatcher
    class << self
      def new(...)
        if evented?
          Lookbook.logger.debug "Using `EventedFileUpdateChecker` for file watching"
        else
          Lookbook.logger.debug "The 'listen' gem was not found. Using `FileUpdateChecker` for file watching"
        end

        file_watcher.new(...)
      end

      def evented?
        !(file_watcher <= ActiveSupport::FileUpdateChecker)
      end

      protected

      def file_watcher
        @_file_watcher ||= begin
          require_relative "./support/evented_file_update_checker"

          EventedFileUpdateChecker
        rescue LoadError
          ActiveSupport::FileUpdateChecker
        end
      end
    end
  end
end
