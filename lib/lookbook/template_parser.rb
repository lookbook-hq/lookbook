require "css_parser"

module Lookbook
  class TemplateParser
    STYLE_TAGS_REGEX = /<style(?:\s[^>]*)?>((?:(?!<\/style>).)*)<\/style>/m
    FRONTMATTER_REGEX = /\A---(.|\n)*?---/

    def initialize(content)
      @raw_content = content.strip
      @parsed_content = nil
      @styles = nil
      @frontmatter = nil
    end

    def content
      parse
      @parsed_content.strip.html_safe
    end

    def styles
      parse
      @styles
    end

    def frontmatter
      parse
      @frontmatter
    end

    private

    def parse
      if @parsed_content.nil?
        @styles = extract_styles(@raw_content)
        content = strip_styles(@raw_content)

        @frontmatter = extract_frontmatter(content)
        content = strip_frontmatter(content)

        @parsed_content = content
      end
    end

    def extract_styles(text)
      styles = []
      css_parser = ::CssParser::Parser.new
      text.scan(STYLE_TAGS_REGEX).flatten.map(&:strip).each do |css|
        css_parser.load_string! css.strip
      end
      css_parser.each_selector do |selector, declarations, specificity|
        styles << "#{selector} { #{declarations} }"
      end
      styles
    end

    def strip_styles(text)
      text.gsub(STYLE_TAGS_REGEX, "")
    end

    def extract_frontmatter(text)
      frontmatter = {}
      text.match(FRONTMATTER_REGEX) do |m|
        frontmatter = YAML.safe_load(m[0])
      end
      frontmatter.deep_symbolize_keys
    end

    def strip_frontmatter(text)
      text.gsub(FRONTMATTER_REGEX, "")
    end
  end
end
