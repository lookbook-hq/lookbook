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
      Rails.application.reloader.to_run { reloader.execute_if_updated }
    end

    def execute
      reloaders.each { |reloader| reloader.execute }
    end

    def execute_all_watching(paths, &callback)
      matched = reloaders.inject(false) do |result, reloader|
        reloader.execute_if_watching(paths) ? true : result
      end
      callback.call if matched && callback.present?
    end

    def self.evented?
      file_watcher_class <= EventedFileUpdateChecker
    end

    def self.file_watcher_class
      @_file_watcher_clas ||= if Rails.application.config.file_watcher <= ActiveSupport::EventedFileUpdateChecker
        EventedFileUpdateChecker
      else
        ActiveSupport::FileUpdateChecker
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
      end

      def file_watcher
        return @_file_watcher if @_file_watcher

        to_watch = directories.each_with_object({}) do |directory, result|
          result[directory] = extensions
        end

        @_file_watcher ||= Reloaders.file_watcher_class.new([], to_watch, &callback)
      end

      def execute_if_watching(paths)
        !!execute if watching?(paths)
      end

      def watching?(file_paths)
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
