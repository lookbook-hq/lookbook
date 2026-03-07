module Lookbook::Rails
  class FileWatcher
    EVENTED_FILE_WATCHER = ActiveSupport::EventedFileUpdateChecker

    def initialize(dirs, &block)
      @file_watcher = Rails.application.config.file_watcher.new([], dirs, &block)
    end

    def updated?
      @file_watcher.execute_if_updated
    end

    delegate :execute_if_updated, to: :@file_watcher

    class << self
      def evented?
        Gem.loaded_specs.has_key?("listen") &&
          Rails.application.config.file_watcher == EVENTED_FILE_WATCHER
      end

      def watching?
        app_config = Rails.application.config
        if Lookbook.config.reload_on_change.nil?
          app_config.enable_reloading || !app_config.cache_classes
        else
          Lookbook.config.reload_on_change
        end
      end
    end
  end
end
