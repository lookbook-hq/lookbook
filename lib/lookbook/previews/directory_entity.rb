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
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def self.icon = :folder

    # def virtual?
    #   File.exist?(full_path)
    # end

    # def full_path
    #   File.join(base_path, lookup_path)
    # end
  end
end
