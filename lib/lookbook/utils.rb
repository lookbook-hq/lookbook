require "digest/sha1"

module Lookbook
  module Utils
    class << self
      def id(*args)
        parts = args.map { _1.to_s }
        id_str = parts.join("-").force_encoding("UTF-8").parameterize.dasherize
        strip_slashes(id_str).tr("/", "-").gsub("--", "-")
      end

      def name(str)
        str.to_s.parameterize.tr("-", "_")
      end

      def label(str)
        str.to_s.titleize
      end

      def normalize_paths(paths, allow_root: false)
        Array(paths).compact.map do |path|
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

      def determine_full_path(rel_path, search_dirs = [])
        base_path = search_dirs.detect { |p| Dir["#{p}/#{rel_path}"].first }
        path = Dir["#{base_path}/#{rel_path}"].first
        Pathname(path) if path
      end

      def strip_slashes(path)
        path.to_s.gsub(/\A\/|\/\z/, "")
      end

      def hash(*args)
        content = args.map(&:to_s).join("")
        Digest::SHA1.hexdigest(content)
      end

      def current_timestamp_milliseconds
        DateTime.now.strftime("%Q").to_i
      end
    end
  end
end
