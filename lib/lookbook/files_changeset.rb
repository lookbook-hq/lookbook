module Lookbook
  class FilesChangeset
    attr_reader :added, :modified, :removed

    def initialize(added: nil, modified: nil, removed: nil)
      @added = added.to_a
      @modified = modified.to_a
      @removed = removed.to_a
    end

    def touched
      [added, modified].flatten.uniq
    end

    def all
      [added, modified, removed].flatten
    end

    def any? = all.any?
  end
end
