module Lookbook
  class PageEntity < Entity
    include EntityTreeNode

    delegate :data, :landing?, :header?, :footer?, :content, to: :metadata

    attr_reader :metadata, :file_path

    def initialize(file_path, file_contents = nil, url_path: nil, lookup_path: nil, default_priority: nil, options: {})
      @file_path = Pathname(file_path)
      @url_path = url_path
      @lookup_path = lookup_path
      @default_priority = default_priority
      @metadata = PageMetadata.new(file_contents, options)
      @base_directories = Pages.page_paths
    end

    def id
      @id ||= Utils.id(metadata.fetch(:id, lookup_path))
    end

    def name
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def label
      metadata.fetch(:label, super)
    end

    def title
      metadata.fetch(:title, label)
    end

    def hidden?
      metadata.fetch(:hidden, super)
    end

    def markdown?
      metadata.fetch(:markdown, Markdown.markdown_file?(file_path))
    end

    def url_param
      lookup_path
    end

    def url_path
      @url_path ||= page_path(self)
    end

    def lookup_path
      @lookup_path ||= PathPriorityPrefixesStripper.call(relative_file_path)
    end

    def relative_file_path
      file_path.relative_path_from(base_directory)
    end

    def parent
      Pages.directories.find { _1.lookup_path == parent_lookup_path }
    end

    def next
      Pages.tree.next(self)
    end

    def previous
      Pages.tree.previous(self)
    end

    def priority
      @priority = begin
        pos = PriorityPrefixParser.call(file_name).first || metadata.fetch(:priority, 0)
        pos.to_i
      end
    end

    def to_h
      {
        entity: "page",
        id: id,
        uuid: uuid,
        name: name,
        label: label,
        title: title,
        hidden: hidden?,
        lookup_path: lookup_path,
        url_path: url_path,
        file_path: file_path
      }
    end

    protected

    def file_name(strip_ext = false)
      basename = file_path.basename
      (strip_ext ? basename.to_s.split(".").first : basename).to_s
    end

    def base_directory
      @base_directory ||= begin
        directories = Array(@base_directories).map(&:to_s).sort_by { |path| path.split("/").size }.reverse
        directories.find { |dir| file_path.to_s.start_with?(dir) }
      end
    end
  end
end
