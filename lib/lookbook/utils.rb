require "digest/sha1"

module Lookbook
  module Utils
    class << self
      def normalize_paths(paths, allow_root: false)
        Array(paths).map do |path|
          full_path = absolute_path(path)
          if File.exist?(full_path)
            full_path if allow_root || !root_path?(full_path)
          end
        end.compact.uniq
      end

      def absolute_path(path)
        File.absolute_path(path.to_s, Rails.root)
      end

      def root_path?(path)
        Rails.application.root.to_s == path.to_s
      end

      def hash(str)
        Digest::SHA1.hexdigest(str.to_s)
      end

      def current_timestamp_milliseconds
        DateTime.now.strftime("%Q").to_i
      end
    end
  end
end
