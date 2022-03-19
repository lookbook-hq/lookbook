module Lookbook
  class PreviewCollection < Collection
    def find_example_by_path(path)
      Lookbook::PreviewExample.all.find { |e| e.lookup_path == path }
    end

    def self.describe_as
      "previews"
    end
  end
end
