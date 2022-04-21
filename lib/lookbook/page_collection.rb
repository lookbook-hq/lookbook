module Lookbook
  class PageCollection < Collection
    def id
      generate_id("page-collection", lookup_path || "root")
    end

    def label
      "Pages"
    end

    def type
      :page_collection
    end

    def self.describe_as
      "pages"
    end
  end
end
