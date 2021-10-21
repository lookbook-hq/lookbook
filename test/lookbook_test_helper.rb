module Lookbook
  module LookbookTestHelper
    def find_preview(path)
      Lookbook::Preview.find(path)
    end

    def example_path(preview, example_name = nil)
      preview = preview.is_a?(String) ? find_preview(preview) : preview
      example = example_name.nil? ? preview.get_examples.first : preview.example(example_name)
      example.path
    end

    def all_preview_files
      Dir.glob("#{Lookbook::Engine.root.join("test/dummy/test/components")}/**/*_preview.rb")
    end
  end
end
