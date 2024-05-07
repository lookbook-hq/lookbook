module Lookbook
  class FileWatcher
    class << self
      def new(...)
        file_watcher.new(...)
      end

      def evented?
        !(file_watcher <= ActiveSupport::FileUpdateChecker)
      end

      protected

      def file_watcher
        @file_watcher ||= if Gem.loaded_specs.has_key?("listen")
          require_relative "evented_file_update_checker"

          Lookbook::EventedFileUpdateChecker
        else
          ActiveSupport::FileUpdateChecker
        end
      end
    end
  end
end
