module Lookbook
  class PreviewExampleCollection < EntityCollection
    protected

    def sort_entities
      @entities.sort_by!(&:label) if Lookbook.config.sort_examples
    end
  end
end
