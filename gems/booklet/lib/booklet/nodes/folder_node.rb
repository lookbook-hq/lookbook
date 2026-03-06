# frozen_string_literal: true

module Booklet
  class FolderNode < Node
    include Nameable
    include Locatable

    permit_child_nodes Locatable.entities

    def directory? = true

    class << self
      def from(path, **props)
        unless FileHelpers.directory?(path)
          raise ArgumentError, "Cannot create FolderNode from file #{path}"
        end

        name = FileHelpers.file_name(path)

        new(path:, name:, **props)
      end
    end
  end
end
