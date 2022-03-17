module Lookbook
  module Api
    class << self
      include Utils

      def find_preview(*args)
        find_preview_and_example(*args).first
      end

      def find_example(*args)
        find_preview_and_example(*args).last
      end

      def find_preview_and_example(*args)
        candidates = []
        path = build_path(args)
        path.scan(%r{/|$}) { candidates << $` }
        match = candidates.reverse.detect { |candidate| Lookbook::Preview.exists?(candidate) }
        if match
          preview = Lookbook::Preview.find(match)
          index = candidates.reverse.index(match)
          example = preview && index == 1 ? preview.example(path.split("/").last) : nil
          [preview, example]
        else
          []
        end
      end

      def build_path(*args)
        args.flatten.map { |arg| preview_class_path(arg) }.join("/")
      end
    end
  end
end
