module Lookbook
  class PageEntity < Entity
    include EntityTreeNode

    attr_reader :file_path, :frontmatter

    def initialize(file_path, default_priority: nil)
      @file_path = Pathname(file_path)
      @base_directories = Pages.page_paths
      @frontmatter, @content = FrontmatterExtractor.call(file_contents)
      @default_priority = default_priority
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def label
      frontmatter.fetch(:label, super)
    end

    def title
      frontmatter.fetch(:title, label)
    end

    def hidden?
      frontmatter.fetch(:hidden, super)
    end

    def content
      @content.strip_heredoc.strip.html_safe
    end

    def url_param
      lookup_path
    end

    def url_path
      show_page_path(self)
    end

    def lookup_path
      @lookup_path ||= Pages.to_lookup_path(relative_file_path)
    end

    def file_name(strip_ext = false)
      basename = file_pathname.basename
      (strip_ext ? basename.to_s.split(".").first : basename).to_s
    end

    def file_extension
      file_pathname.extname
    end

    def directory_path
      Pathname(file_pathname.dirname)
    end

    def relative_file_path
      file_pathname.relative_path_from(base_directory)
    end

    def relative_directory_path
      directory_path.relative_path_from(base_directory)
    end

    def file_pathname
      Pathname(file_path)
    end

    def base_directory
      @base_directory ||= begin
        directories = Array(@base_directories).map(&:to_s).sort_by { |path| path.split("/").size }.reverse
        directories.find { |dir| file_path.to_s.start_with?(dir) }
      end
    end

    def source_checksum
      @source_checksum ||= Utils.hash(file_contents)
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

    private

    def file_contents
      @file_contents ||= File.read(file_path)
    end
  end
end
