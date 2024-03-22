module Lookbook
  class PagesParser
    attr_reader :errors

    def initialize(page_paths)
      @page_paths = page_paths
      @errors = []
    end

    def parse(paths = @page_paths, &callback)
      @errors = []

      glob_paths = paths.to_a.map do |path|
        if File.directory?(path)
          ["#{path}/**/*.html.*", "#{path}/**/*.md.*", "#{path}/**/*.md"]
        elsif path.to_s.end_with?(".erb")
          path.to_s
        end
      end.flatten.compact

      file_paths = Dir.glob(glob_paths)
      page_entities = file_paths.map { PageEntity.new(_1) }

      callback.call(page_entities, @errors)
    end
  end
end
