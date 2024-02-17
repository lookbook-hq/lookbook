module Lookbook
  class PreviewCollection < EntityCollection
    def find_by_id(id)
      previews.find { _1.id == id }
    end

    def previews = @entities
  end
end
