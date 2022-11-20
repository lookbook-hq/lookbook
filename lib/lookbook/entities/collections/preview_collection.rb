module Lookbook
  class PreviewCollection < EntityCollection
    include HierarchicalCollection

    def find_example_by_path(lookup_path)
      examples.find_by_path(lookup_path)
    end

    def find_by_preview_class(klass)
      find { |preview| preview.preview_class.name == klass.to_s }
    end

    def load(code_objects)
      @entities = []
      clear_cache

      previews = Array(code_objects).map { |obj| PreviewCollection.preview_from_code_object(obj) }.compact
      add(previews)
    end

    def self.preview_from_code_object(code_object)
      klass = code_object.path.constantize
      Preview.new(code_object) if klass.ancestors.include?(ViewComponent::Preview)
    rescue => exception
      Lookbook.logger.error LookbookError.new(exception)
      nil
    end

    protected

    def examples
      @_cache[:examples] ||= PreviewExampleCollection.new(flat_map(&:examples))
    end
  end
end
