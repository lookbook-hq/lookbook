module Lookbook
  class PageDirectories
    def initialize
      @directories = []
    end

    def find_or_add(lookup_path, path = nil)
      find(lookup_path) || add(lookup_path, path)
    end

    def find(lookup_path)
      @directories.find { _1.lookup_path == lookup_path }
    end

    def add(lookup_path, path = nil)
      @directories << PageDirectoryEntity.new(lookup_path, path: path)
      @directories.last
    end
  end
end
