require "digest/sha1"

module Lookbook
  module Utils
    class << self
      def id(*args)
        parts = args.map { _1.to_s }
        id_str = parts.join("-").force_encoding("UTF-8").parameterize.dasherize
        strip_slashes(id_str).tr("/", "-").gsub("--", "-")
      end

      def name(str, symbolize = false)
        str_name = str.to_s.parameterize.tr("-", "_")
        symbolize ? str_name.to_sym : str_name
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

      def to_path(*args)
        args.flatten.compact.map(&:to_s).join("/")
      end

      def strip_slashes(path)
        path.to_s.gsub(/\A\/|\/\z/, "")
      end

      def hash(*args)
        content = args.map(&:to_s).join("")
        Digest::SHA1.hexdigest(content)[0, 6]
      end

      def current_timestamp_milliseconds
        DateTime.now.strftime("%Q").to_i
      end

      def boolean?(value)
        value.in?([true, false])
      end

      def deep_camelize_keys(obj)
        if obj.is_a?(Hash)
          obj.map do |key, value|
            camel_key = key.to_s.camelize(:lower).to_sym
            camel_value = deep_camelize_keys(value)
            [camel_key, camel_value]
          end.to_h
        elsif obj.is_a?(Array)
          obj.map { deep_camelize_keys(_1) }
        else
          obj
        end
      end

      def gem_installed?(name)
        Gem.loaded_specs.has_key?(name)
      end
    end
  end
end
