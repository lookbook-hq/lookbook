module Lookbook
  class Entity
    include Utils

    def initialize(reference_path)
      @refpath = reference_path
    end

    def id
      generate_id(lookup_path)
    end

    def label
      lookup_path.split("/").last.titleize
    end

    def type
      :item
    end

    def path
      @refpath
    end

    def lookup_path
      @lookup_path ||= to_lookup_path(@refpath)
    end

    def hierarchy_depth
      @refpath.present? ? @refpath.split("/").size : 0
    end

    def position
      0
    end

    def hidden?
      false
    end

    def matchers
      nil
    end

    alias_method :url_path, :lookup_path
  end
end
