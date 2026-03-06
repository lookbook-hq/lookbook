# frozen_string_literal: true

module Booklet
  class FileNode < Node
    include Locatable

    class << self
      def from(path, **props)
        if FileHelpers.directory?(path)
          raise ArgumentError, "Cannot create FileNode from directory #{path}"
        end

        new(path:, **props)
      end
    end
  end
end
