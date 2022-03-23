module Lookbook
  class Page
    include Utils

    FRONTMATTER_FIELDS = [
      :id,
      :label,
      :title,
      :hidden,
      :landing,
      :position,
      :markdown,
      :header,
      :footer,
      :data
    ]

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

    def hidden?
      options[:hidden] == true
    end

    def markdown?
      options[:markdown] == true
    end

    def header?
      options[:header] == true
    end

    def footer?
      options[:footer] == true
    end

    def get(key)
      options[key]
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
        options[method_name]
      else
        super
      end
    end

    def respond_to_missing?(method_name, include_private = false)
      FRONTMATTER_FIELDS.include? method_name
    end

    protected

    def file_contents
      File.read(full_path)
    end

    def options
      return @options if @options
      frontmatter = (get_frontmatter(file_contents) || {}).deep_symbolize_keys
      options = Lookbook.config.page_options.deep_merge(frontmatter).with_indifferent_access
      options[:id] = options[:id] ? generate_id(options[:id]) : generate_id(lookup_path)
      options[:label] ||= name.titleize
      options[:title] ||= options[:label]
      options[:hidden] ||= false
      options[:landing] ||= false
      options[:position] = options[:position] ? options[:position].to_i : get_position_prefix(path_name)
      options[:markdown] ||= markdown_file?
      options[:header] = true unless options.key? :header
      options[:footer] = true unless options.key? :footer
      @options ||= options
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
        Lookbook.config.page_paths
      end
    end
  end
end
