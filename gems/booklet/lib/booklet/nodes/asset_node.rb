# frozen_string_literal: true

module Booklet
  class AssetNode < Node
    include Locatable

    MIME_TYPES = %w[text/css text/javascript]

    class << self
      def from(path, **props)
        mime_type = FileHelpers.mime_type(path)

        if FileHelpers.directory?(path)
          raise ArgumentError, "Cannot create AssetNode from directory #{path}"
        end

        unless mime_type.in?(MIME_TYPES) || mime_type.start_with?("image/")
          raise ArgumentError, "Cannot create AssetNode from file of mime type #{mime_type}"
        end

        new(path:, **props)
      end
    end
  end
end
