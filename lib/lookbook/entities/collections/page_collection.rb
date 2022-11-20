module Lookbook
  class PageCollection < EntityCollection
    include HierarchicalCollection

    def load(page_paths)
      @entities = []
      clear_cache

      file_paths = page_paths.flat_map do |dir|
        PathUtils.normalize_paths(Dir["#{dir}/**/*.html.*", "#{dir}/**/*.md.*"].sort)
      end

      entities = file_paths.map { |path| PageCollection.entity(path) }
      pages, sections = entities.partition { |page| page.type == :page }

      page_dict = pages.index_by(&:lookup_path)
      sections.each do |section|
        parent = page_dict[section.lookup_path]
        section.parent = parent
        parent.add_section(section)
      end

      add(pages)
    end

    def self.entity(file_path)
      File.basename(file_path).match?(%r{\[(.*?\w+)\]}) ? PageSection.new(file_path) : Page.new(file_path)
    end
  end
end
