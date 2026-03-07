# frozen_string_literal: true

module Lookbook
  module Markdown
    class FrontmatterParser < Lookbook::Object
      FRONTMATTER_REGEX = /\A---(.|\n)*?---/

      def parse(str)
        [
          FrontmatterParser.extract_frontmatter(str.to_s),
          FrontmatterParser.strip_frontmatter(str.to_s)
        ]
      end

      class << self
        def extract_frontmatter(text)
          matches = text.match(FRONTMATTER_REGEX)
          matches ? YAML.safe_load(matches[0]).deep_symbolize_keys : {}
        end

        def strip_frontmatter(text)
          text.gsub(FRONTMATTER_REGEX, "").strip
        end
      end
    end
  end
end
