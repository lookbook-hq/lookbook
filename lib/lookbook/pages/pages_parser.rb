module Lookbook
  class PagesParser
    attr_reader :error_paths

    def initialize(page_paths)
      @page_paths = page_paths
      @error_paths = []
    end

    def parse(paths = @page_paths, &callback)
      Engine.notifications.clear(:pages)

      glob_paths = [*error_paths, *paths].to_a.map do |path|
        if File.directory?(path)
          Lookbook.config.page_extensions.map { "#{path}/**/*.#{_1}" }
        else
          path_str = path.to_s
          path_str if Lookbook.config.page_extensions.find { File.fnmatch?("**/*.#{_1}", path_str) }
        end
      end.flatten.compact

      @error_paths = []
      page_entities = Dir.glob(glob_paths).map do |path|
        PageEntity.new(path)
      rescue => error
        error_paths << path
        Engine.notifications.add(:pages, ParserError.new(error))
        warn(error.message)
        nil
      end

      callback.call(page_entities.compact)
    end
  end
end
