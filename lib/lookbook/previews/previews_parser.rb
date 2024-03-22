module Lookbook
  class PreviewsParser
    include Loggable

    attr_reader :errors

    def initialize(preview_paths, code_parser)
      @preview_paths = preview_paths
      @code_parser = code_parser
      @errors = []
    end

    def record_error(error)
      @errors << error
    end

    def parse(paths = @preview_paths, &callback)
      @errors = []

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
        rescue => error
          record_error(error)
          warn(error.message)
          nil
        end

        callback.call(preview_entities.compact, @errors)
      end
    end
  end
end
