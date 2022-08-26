module Lookbook
  class Page < Entity
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

    attr_reader :errors
    attr_accessor :sections

    def initialize(path, base_path)
      @pathname = Pathname.new path
      @base_path = Pathname.new base_path
      @options = nil
      @errors = []
      @sections = []
      @page_name = remove_position_prefix(path_name)
      rel_path = @pathname.relative_path_from(@base_path)
      page_path = rel_path.dirname.to_s == "." ? @page_name : "#{rel_path.dirname}/#{@page_name}"
      super(page_path)
    end

    def url_path
      lookbook_page_path lookup_path
    end

    def full_path
      Rails.root.join(@pathname.to_s)
    end

    def name
      @page_name
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
      @content ||= strip_frontmatter(file_contents).strip
    end

    def matchers
      normalize_matchers(label)
    end

    def parent_collections_names
      File.dirname(path).split("/")
    end

    def type
      :page
    end

    def id
      options[:id]
    end

    def position
      options[:position]
    end

    def hidden
      options[:hidden]
    end

    def label
      options[:label]
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
      begin
        frontmatter = (get_frontmatter(file_contents) || {}).deep_symbolize_keys
      rescue => exception
        frontmatter = {}
        line_number_match = exception.message.match(/.*line\s(\d+)/)
        @errors.push(Lookbook::Error.new(exception, **{
          title: "YAML frontmatter parsing error",
          file_path: @pathname.to_s,
          line_number: line_number_match ? line_number_match[1] : false
        }))
      end
      @options = Lookbook.config.page_options.deep_merge(frontmatter).with_indifferent_access
      @options[:id] = generate_id(@options[:id] || lookup_path)
      @options[:label] ||= name.titleize
      @options[:title] ||= @options[:label]
      @options[:hidden] ||= false
      @options[:landing] ||= false
      @options[:position] = @options[:position] ? @options[:position].to_i : get_position_prefix(path_name)
      @options[:markdown] ||= markdown_file?
      @options[:header] = true unless @options.key? :header
      @options[:footer] = true unless @options.key? :footer
      @options
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

      def any?
        all.any?
      end

      def all
        pages, sections =
          Array(page_paths).flat_map do |dir|
            Dir["#{dir}/**/*.html.*", "#{dir}/**/*.md.*"].sort.map do |path|
              create(path, dir)
            end
          end.partition { |page| page.type == :page }

        sorted_pages = pages
          .uniq { |page| page.path }
          .sort_by { |page| [page.position, page.label] }

        page_dict = sorted_pages.index_by(&:path)
        sorted_sections = sections.sort_by { |section| [section.position, section.label] }

        sorted_sections.each do |section|
          page_dict[section.path].sections << section
        end

        PageCollection.new(sorted_pages)
      end

      def page_paths
        Lookbook.config.page_paths.select { |dir| Dir.exist? dir }
      end

      def section_path?(path)
        !!path.match(%r{\[(.*?\w+)\]})
      end

      def create(path, base_path)
        (section_path?(path) ? PageSection : Page).new(path, base_path)
      end
    end
  end
end
