module Lookbook
  class Page
    def initialize(path, base_path)
      @pathname = Pathname.new path
      @base_path = base_path
    end

    def url_path
      rel_path = @pathname.relative_path_from(@base_path)
      String(rel_path.dirname) == "." ? name : "#{rel_path.dirname}/#{name}"
    end

    def name
      @pathname.basename(".html#{@pathname.extname}").to_s
    end

    def id
      url_path.underscore.tr("/", "-").tr("_", "-")
    end

    def label
      name.titleize
    end

    class << self
      def find(path)
        all.find { |p| p.url_path == path }
      end

      def all
        pages = Array(page_paths).map do |dir|
          Dir["#{dir}/**/*.html.*"].sort.map do |page|
            Lookbook::Page.new(page, dir)
          end
        end
        pages.flatten.uniq { |p| p.url_path }
      end

      def page_paths
        Lookbook.config.page_paths
      end
    end
  end
end
