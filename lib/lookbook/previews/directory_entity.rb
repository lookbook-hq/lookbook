module Lookbook
  class DirectoryEntity < Entity
    attr_reader :lookup_path, :base_path

    def initialize(lookup_path, base_path)
      @lookup_path = lookup_path
      @base_path = base_path
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def virtual?
      File.exist?(full_path)
    end

    def full_path
      File.join(base_path, lookup_path)
    end
  end
end
