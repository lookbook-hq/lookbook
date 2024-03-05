module Lookbook
  class PreviewsParser
    def initialize(preview_paths, code_parser)
      @preview_paths = preview_paths
      @code_parser = code_parser
    end

    def parse(paths = @preview_paths, &callback)
      glob_paths = paths.to_a.map do |path|
        if File.directory?(path)
          "#{path}/**/*preview.rb"
        elsif path.to_s.end_with?("preview.rb")
          path.to_s
        end
      end

      @code_parser.parse(glob_paths.compact) do |code_objects|
        preview_entities = code_objects.map do |code_object|
          klass = code_object.path.constantize
          PreviewEntity.new(code_object, klass) if Previews.preview_class?(klass)
        end

        callback.call(preview_entities.compact)
      end
    end
  end
end
