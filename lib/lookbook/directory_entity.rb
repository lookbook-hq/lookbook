module Lookbook
  class DirectoryEntity < Entity
    include EntityTreeNode

    CONFIG_FILE_NAME = "_config.yml"

    attr_reader :lookup_path

    def initialize(lookup_path, path: nil)
      @lookup_path = lookup_path
      @path = path
      @type = :directory
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= lookup_path.split("/").pop
    end

    def label
      config.fetch(:label, super)
    end

    def hidden?
      config.fetch(:hidden, false) || children.select(&:visible?).none?
    end

    def path
      Pathname(@path) if @path
    end

    def exists?
      path ? File.exist?(path) : false
    end

    def children
      raise Lookbook::Error, "DirectoryEntity subclasses must define a #children method"
    end

    def parent
      raise Lookbook::Error, "DirectoryEntity subclasses must define a #parent method"
    end

    def config
      @config ||= begin
        opts = if exists?
          config_file_path = File.join(path, CONFIG_FILE_NAME)
          if File.exist?(config_file_path)
            YAML.safe_load_file(config_file_path)
          end
        end
        DataObject.new(opts || {})
      end
    end

    def to_h
      {
        entity: "directory",
        name: name,
        label: label,
        lookup_path: lookup_path,
        path: path.to_s,
        children: children.map(&:to_h)
      }
    end
  end
end
