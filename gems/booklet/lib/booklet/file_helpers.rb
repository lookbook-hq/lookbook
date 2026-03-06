# frozen_string_literal: true

require "marcel"

module Booklet
  module FileHelpers
    def mime_type(path)
      path = Pathname(path)
      Marcel::MimeType.for(path, name: path.basename) unless path.directory?
    end

    def file_name(path)
      File.basename(path, extension(path) || "")
    end

    alias_method :dir_name, :file_name

    def extension(path)
      return nil if directory?(path)

      File.basename(path).to_s.gsub(/^([^.]+)/, "")
    end

    def directory?(path)
      path = Pathname(path)
      if path.exist?
        path.directory?
      else
        path.to_s.end_with?("/")
      end
    end

    extend self
  end
end
