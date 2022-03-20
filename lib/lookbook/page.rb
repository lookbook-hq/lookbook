module Lookbook
  class Page
    include Utils

    def initialize(path, base_path)
      @pathname = Pathname.new path
      @base_path = base_path
    end

    def path
      rel_path = @pathname.relative_path_from(@base_path)
      (rel_path.dirname.to_s == "." ? name : "#{rel_path.dirname}/#{name}")
    end

    def lookup_path
      @lookup_path ||= to_lookup_path(path)
    end

    def full_path
      Rails.root.join(@pathname.to_s)
    end

    def name
      remove_position_prefix(path_name)
    end

    def id
      generate_id(lookup_path)
    end

    def title?
      data[:title] != false
    end

    def hidden?
      data[:hidden] == true
    end

    def markdown?
      data[:markdown] == true
    end

    def get(key)
      data[key]
    end

    def content
      @content ||= strip_frontmatter(file_contents)
    end

    def matchers
      normalize_matchers(label)
    end

    def hierarchy_depth
      path.split("/").size
    end

    def parent_collections_names
      File.dirname(path).split("/")
    end

    def type
      :page
    end

    def method_missing(method_name, *args, &block)
      if args.none? && !block
        data[method_name]
      else
        super
      end
    end

    def respond_to_missing?(method_name, include_private = false)
      data.key? method_name
    end

    protected

    def file_contents
      File.read(full_path)
    end

    def data
      return @data if @data
      frontmatter = get_frontmatter(file_contents)
      data = Lookbook.config.page_data.merge(frontmatter || {}).with_indifferent_access
      data[:label] ||= name.titleize
      data[:title] ||= data[:label]
      data[:hidden] ||= false
      data[:landing] ||= false
      data[:position] = data[:position] ? data[:position].to_i : get_position_prefix(path_name)
      data[:markdown] ||= markdown_file?
      @data ||= data
    end

    def path_name
      @pathname.basename(@pathname.extname).to_s.gsub(/\.(html|md)$/, "")
    end

    def markdown_file?
      @pathname.basename(@pathname.extname).to_s.end_with?(".md")
    end

    class << self
      def find(path)
        all.find { |p| p.lookup_path == path }
      end

      def exists?(path)
        !!find(path)
      end

      def all
        pages = Array(page_paths).map do |dir|
          Dir["#{dir}/**/*.html.*", "#{dir}/**/*.md.*"].sort.map do |page|
            Lookbook::Page.new(page, dir)
          end
        end
        sorted_pages = pages.flatten.uniq { |p| p.path }.sort_by { |page| [page.position, page.label] }
        PageCollection.new(sorted_pages)
      end

      def page_paths
        Lookbook.config.page_paths.filter { |dir| Dir.exist? dir }
      end
    end
  end
end
