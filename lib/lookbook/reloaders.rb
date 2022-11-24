require "active_support"

module Lookbook
  class Reloaders
    attr_reader :reloaders

    def initialize
      @reloaders = []
    end

    def add(name, directories, extensions, &callback)
      reloader = Reloader.new(name, directories, extensions, &callback)
      reloaders.push(reloader)

      Rails.application.reloaders << reloader
      Rails.application.reloader.to_prepare { reloader.execute_if_updated }
    end

    def execute
      reloaders.each { |reloader| reloader.execute }
    end

    def execute_all_watching(changes)
      reloaders.inject(false) do |result, reloader|
        reloader.execute_if_watching(changes) ? true : result
      end
    end

    class << self
      def evented?
        !(file_watcher <= ActiveSupport::FileUpdateChecker)
      end

      def file_watcher
        @_file_watcher_class ||= silence_warnings do
          require "listen"
          Lookbook.logger.debug "Using `EventedFileUpdateChecker` for file watching"

          EventedFileUpdateChecker
        rescue LoadError
          Lookbook.logger.warn "The 'listen' gem was not found. You will need to manually refresh the Lookbook UI after making changes."
          ActiveSupport::FileUpdateChecker
        end
      end
    end

    class Reloader
      delegate :execute, :execute_if_updated, :updated?, to: :file_watcher

      attr_reader :name, :directories, :extensions, :callback

      def initialize(name, directories, extensions, &callback)
        @name = name.to_sym
        @directories = directories
        @extensions = extensions
        @callback = callback
        @last_changes = []
      end

      def file_watcher
        return @_file_watcher if @_file_watcher

        to_watch = directories.each_with_object({}) do |directory, result|
          result[directory] = extensions
        end

        @_file_watcher ||= Reloaders.file_watcher.new([], to_watch) do
          callback.call(@last_changes)
        end
      end

      def execute_if_watching(changes)
        if watching?(changes)
          @last_changes = changes
          execute
        else
          @last_changes = []
        end
      end

      def watching?(changes)
        file_paths = changes.to_h.values.flatten
        !!file_paths.find do |file_path|
          file_path = Pathname(file_path).expand_path
          directories.find do |dir_path|
            matcher = File.expand_path(File.join(dir_path, "**"))
            file_path.fnmatch?(matcher)
          end
        end
      end
    end
  end
end
