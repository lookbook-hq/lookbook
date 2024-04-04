module Lookbook
  class PagesParser
    def initialize(page_paths)
      @page_paths = page_paths
    end

    def parse(paths = @page_paths, &callback)
      glob_paths = paths.to_a.map do |path|
        if File.directory?(path)
          ["#{path}/**/*.html.*", "#{path}/**/*.md.*", "#{path}/**/*.md"]
        elsif path.to_s.end_with?(".erb")
          path.to_s
        end
      end.flatten.compact

      file_paths = Dir.glob(glob_paths)
      page_entities = file_paths.map do |path|
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
