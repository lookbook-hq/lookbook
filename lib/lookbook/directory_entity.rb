module Lookbook
  class DirectoryEntity < Entity
    attr_reader :lookup_path

    def initialize(lookup_path)
      @lookup_path = lookup_path
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= lookup_path.split("/").pop
    end
  end
end
