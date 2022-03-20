module Lookbook
  class PreviewCollection < Collection
    def id
      generate_id("preview-collection", lookup_path || "root")
    end

    def find_example(path)
      Lookbook::PreviewExample.all.find { |e| e.lookup_path == path }
    end

    def self.describe_as
      "previews"
    end
  end
end
