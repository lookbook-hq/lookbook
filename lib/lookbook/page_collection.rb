module Lookbook
  class PageCollection < Collection
    def id
      generate_id("page-collection", lookup_path || "root")
    end

    def self.describe_as
      "pages"
    end
  end
end
