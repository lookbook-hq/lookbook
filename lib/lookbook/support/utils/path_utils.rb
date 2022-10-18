module Lookbook
  module PathUtils
    class << self
      def to_absolute(path)
        File.absolute_path(path.to_s, Rails.root)
      end

      def normalize_all(paths, allow_root: false)
        Array(paths).map do |path|
          full_path = to_absolute(path)
          if Dir.exist?(full_path)
            full_path if allow_root || !root_path?(full_path)
          end
        end.compact.uniq
      end

      def root_path?(path)
        Rails.application.root.to_s == path.to_s
      end
    end
  end
end
