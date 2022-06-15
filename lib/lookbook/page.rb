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

    attr_reader :errors
    attr_accessor :tabs

    def initialize(path, base_path)
      @pathname = Pathname.new path
      @base_path = Pathname.new base_path
      @options = nil
      @errors = []
      @tabs = []
    end

    def path
      rel_path = @pathname.relative_path_from(@base_path)

      _path = (rel_path.dirname.to_s == "." ? name : "#{rel_path.dirname}/#{name}")
      _path.gsub!("[#{tab}]", "") if tab?
      _path
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
      @content ||= strip_frontmatter(file_contents).strip
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
      tab? ? :tab : :page
    end

    def tab
      matches = full_path.to_s.match(%r{\[(?<tab>\w+)\]})
      matches ? remove_position_prefix(matches[:tab]) : nil
    end

    def tab?
      tab.present?
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
      @options[:id] = @options[:id] ? generate_id(@options[:id]) : generate_id(lookup_path)
      @options[:label] ||= (tab? ? tab : name).titleize
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

      def all
        pages, tabs =
          Array(page_paths).flat_map do |dir|
            Dir["#{dir}/**/*.html.*", "#{dir}/**/*.md.*"].sort.map do |page|
              page = Lookbook::Page.new(page, dir)
            end
          end.partition { |page| page.type == :page }

        sorted_pages = pages
          .uniq { |page| page.path }
          .sort_by { |page| [page.position, page.label] }

        page_dict = sorted_pages.index_by(&:path)
        sorted_tabs = tabs.sort_by { |tab| [tab.position, tab.label] }

        sorted_tabs.each do |tab|
          page_dict[tab.path].tabs << tab
        end

        PageCollection.new(sorted_pages)
      end

      def page_paths
        Lookbook.config.page_paths.select { |dir| Dir.exist? dir }
      end
    end
  end
end
