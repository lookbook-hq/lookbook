# frozen_string_literal: true

module Booklet
  class FrontmatterExtractor < Visitor
    after_initialize do
      @parser = Markdown::FrontmatterParser.new
    end

    visit PageNode do |page|
      return page if page.errors? || visited?(page)

      begin
        frontmatter, contents = @parser.parse(page.contents)
        frontmatter.each do |k, v|
          page.public_send("#{k}=", v)
        end
      rescue NoMethodError => error
        page.add_warning("Invalid frontmatter property `#{error.name}`")
      rescue => error
        page.add_error(error)
      end

      page.contents = contents
      page
    end
  end
end
