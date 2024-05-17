module Lookbook
  class PageMetadata
    def initialize(file_contents, frontmatter_defaults = {})
      @file_contents = file_contents || ""
      @frontmatter_defaults = frontmatter_defaults.to_h
    end

    def landing?
      frontmatter.fetch(:landing, false)
    end

    def header?
      frontmatter.fetch(:header, true)
    end

    def footer?
      frontmatter.fetch(:footer, true)
    end

    def markdown?
      frontmatter.fetch(:markdown, true)
    end

    def data
      DataObject.new(frontmatter.fetch(:data, {}))
    end

    def content
      @content ||= parsed_content[:content]
      @content.strip_heredoc.strip.html_safe
    end

    def fetch(name, fallback = nil)
      respond_to?(name) ? (public_send(name) || fallback) : frontmatter.fetch(name, fallback)
    end

    protected

    def frontmatter
      @frontmatter ||= DataObject.new(
        Lookbook.config.page_frontmatter_defaults
          .deep_merge(@frontmatter_defaults)
          .deep_merge(parsed_content[:frontmatter])
      )
    end

    def parsed_content
      @parsed_content ||= begin
        frontmatter, content = FrontmatterExtractor.call(@file_contents)
        {frontmatter: frontmatter, content: content}
      end
    end
  end
end
