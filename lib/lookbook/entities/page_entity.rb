module Lookbook
  # Represents a documentation page
  #
  # @ignore methods
  # @api public
  class PageEntity < Entity
    include LocatableEntity
    include NavigableEntity

    attr_reader :content, :sections

    def initialize(file_path)
      @file_path = Pathname(file_path)
      @base_directories = Engine.page_paths
      @lookup_path = PathUtils.to_lookup_path(relative_file_path)
      @frontmatter, @content = FrontmatterExtractor.call(file_contents)
      @priority_prefixes = true
      @sections = []
    end

    def title
      @_title ||= fetch_config(:title, label)
    end

    def landing?
      @_landing ||= fetch_config(:landing, false)
    end

    def markdown?
      @_markdown ||= fetch_config(:markdown) { file_path.to_s.match?(/(.*)\.md\.(.*)$/) }
    end

    def header?
      @_header ||= fetch_config(:header, true)
    end

    def footer?
      @_footer ||= fetch_config(:footer, true)
    end

    def data
      return @_data if @_data

      config_data = fetch_config(:data, {})
      @_data ||= config_data.is_a?(Hash) ? Store.new(config_data) : config_data
    end

    def search_terms
      label
    end

    def url_path
      lookbook_page_path(path)
    end

    def add_section(section)
      @sections << section
      @sections.sort_by! { |section| [section.priority, section.label] }
    end

    def method_missing(method_name, *args, &block)
      method_name.to_s.end_with?("=") ? super : frontmatter.fetch(method_name, nil)
    end

    def respond_to_missing?(method_name, include_private = false)
      frontmatter.key?(method_name) || super
    end

    protected

    def fetch_config(key, fallback = nil, &block)
      value = frontmatter[key]
      Utils.value_or_fallback(value, fallback, &block)
    end

    def file_contents
      @_file_contents ||= File.read(file_path)
    end

    def frontmatter
      @_merged_frontmatter ||= Lookbook.config.page_options.deep_merge(@frontmatter.to_h).deep_symbolize_keys
    end
  end
end
