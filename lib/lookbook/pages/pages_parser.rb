module Lookbook
  class PagesParser
    def initialize(page_paths)
      @page_paths = page_paths
    end

    def parse(paths = @page_paths, &callback)
      glob_paths = paths.to_a.map do |path|
        if File.directory?(path)
          Lookbook.config.page_extensions.map { "#{path}/**/*.#{_1}" }
        else
          path_str = path.to_s
          path_str if Lookbook.config.page_extensions.find { File.fnmatch?("**/*.#{_1}", path_str) }
        end
      end.flatten.compact

      page_entities = Dir.glob(glob_paths).map do |path|
        PageEntity.new(path)
      rescue => error
        Engine.notifications.add(ParserError.new(error))
        warn(error.message)
        nil
      end

      callback.call(page_entities.compact)
    end
  end
end
