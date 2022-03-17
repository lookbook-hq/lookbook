module Lookbook
  class Page
    METADATA_DEFAULTS = {
      hidden: false,
      title: nil,
      position: nil,
      label: nil
    }

    def initialize(path, base_path)
      @pathname = Pathname.new path
      @base_path = base_path
    end

    def path
      rel_path = @pathname.relative_path_from(@base_path)
      String(rel_path.dirname) == "." ? name : "#{rel_path.dirname}/#{name}"
    end

    def fullpath
      Rails.root.join(@pathname.to_s)
    end

    def name
      path_name.gsub(/^(\d+?)-/, "")
    end

    def id
      path.underscore.tr("/", "-").tr("_", "-")
    end

    def label
      metadata[:label].presence || name.titleize
    end

    def title
      metadata[:title].presence || label
    end

    def title?
      metadata[:title] != false
    end

    def hidden?
      metadata[:hidden] == true
    end

    def position
      pos = path_name.match(/^(\d+?)-/)
      metadata[:position].presence || (pos ? pos[1].to_i : 0)
    end

    def markdown?
      md_ext = @pathname.basename(@pathname.extname).to_s.end_with?(".md")
      metadata.key?(:markdown) ? metadata[:markdown] : md_ext
    end

    def metadata
      METADATA_DEFAULTS.merge(Lookbook.config.page_metadata).merge(frontmatter).with_indifferent_access
    end

    def content
      file_contents.gsub(/\A---(.|\n)*?---/, "")
    end

    def matchers
      [label].map { |m| m.gsub(/\s/, "").downcase }
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

    def file_contents
      File.read(fullpath)
    end

    protected

    def path_name
      @pathname.basename(@pathname.extname).to_s.gsub(/\.(html|md)$/, "")
    end

    def frontmatter
      fm = file_contents.match(/\A---((.|\n)*?)---/)
      fm.nil? ? {} : YAML.safe_load(fm[1])
    end

    class << self
      def find(path)
        all.find { |p| p.path == path }
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
        Lookbook.config.page_paths
      end
    end
  end
end
