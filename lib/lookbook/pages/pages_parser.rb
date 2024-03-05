module Lookbook
  class PagesParser
    def initialize(page_paths)
      @page_paths = page_paths
    end

    def parse(paths = @page_paths, &callback)
      glob_paths = paths.to_a.map do |path|
        if File.directory?(path)
          "#{path}/**/*{html,md}.erb"
        elsif path.to_s.end_with?(".erb")
          path.to_s
        end
      end.compact

      callback.call([]) # TODO
    end
  end
end
