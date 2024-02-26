module Lookbook
  class Reloader
    include Loggable

    delegate :execute, :execute_if_updated, :updated?, to: :file_watcher

    attr_reader :name

    def initialize(name, directories, extensions, &callback)
      @name = name.to_sym
      @directories = directories
      @extensions = extensions
      @last_changeset = nil
      @callback = callback
    end

    def watching?(paths)
      !!paths.find do |file_path|
        file_path = Pathname(file_path).expand_path
        @directories.find do |dir_path|
          matcher = File.expand_path(File.join(dir_path, "**"))
          file_path.fnmatch?(matcher)
        end
      end
    end

    protected

    def watch_dirs
      @directories.each_with_object({}) do |directory, result|
        result[directory.to_s] = @extensions
      end
    end

    def file_watcher
      @_file_watcher ||= begin
        file_watcher = FileWatcher.new([], watch_dirs) do
          @callback.call(@last_changeset)
          @last_changeset = nil
        end

        if FileWatcher.evented?
          file_watcher.on_change do |changeset|
            if watching?(changeset.all)
              debug("#{name}: file changes detected")
              @last_changeset = changeset
              Engine.files_updated!
            end
          end
        end

        file_watcher
      end
    end
  end
end
