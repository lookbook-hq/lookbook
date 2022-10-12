module Lookbook
  module PathUtils
    class << self
      def to_absolute(path)
        File.absolute_path(path.to_s, Rails.root)
      end

      def normalize_all(paths, allow_root: false)
        root = Rails.application.root.to_s
        paths.map do |path|
          full_path = to_absolute(path)
          if Dir.exist?(full_path)
            full_path if allow_root || full_path.to_s != root
          end
        end.compact.uniq
      end
    end
  end
end
