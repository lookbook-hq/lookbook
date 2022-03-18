module Lookbook
  class Page
    include Utils

    POSITION_PREFIX_REGEX = /^(\d+?)[-_]/

    def initialize(path, base_path)
      @pathname = Pathname.new path
      @base_path = base_path
    end

    def path
      rel_path = @pathname.relative_path_from(@base_path)
      (String(rel_path.dirname) == "." ? name : "#{rel_path.dirname}/#{name}")
    end

    def url_path
      path.gsub(POSITION_PREFIX_REGEX, "").gsub(/\/(\d+?)[-_]/, "/")
    end

    def fullpath
      Rails.root.join(@pathname.to_s)
    end

    def name
      path_name.gsub(POSITION_PREFIX_REGEX, "")
    end

    def id
      generate_id(url_path)
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
      parse_frontmatter(file_contents).last
    end

    def matchers
      normalize_matchers(label)
    end

    def hierarchy_depth
      path.split("/").size
    end

    def parent_collections
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
      File.read(fullpath)
    end

    def data
      return @data if @data
      frontmatter = parse_frontmatter(file_contents).first
      data = Lookbook.config.page_data.merge(frontmatter || {}).with_indifferent_access
      data[:label] ||= name.titleize
      data[:title] ||= data[:label]
      data[:hidden] || false
      data[:position] = data[:position] ? data[:position].to_i : parse_position_prefix(path_name).first
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
        all.find { |p| p.url_path == path }
      end

      def all
        pages = Array(page_paths).map do |dir|
          Dir["#{dir}/**/*.html.*", "#{dir}/**/*.md.*"].sort.map do |page|
            Lookbook::Page.new(page, dir)
          end
        end
        pages.flatten.uniq { |p| p.path }
      end

      def page_paths
        Lookbook.config.page_paths.filter { |dir| Dir.exist? dir }
      end
    end
  end
end
