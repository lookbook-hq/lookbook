module Lookbook
  module PathUtils
    class << self
      def to_absolute(path)
        File.absolute_path(path.to_s, Rails.root)
      end

      def normalize_all(paths)
        paths.map do |path|
          full_path = to_absolute(path)
          full_path if Dir.exist?(full_path)
        end.compact.uniq
      end
    end
  end
end
