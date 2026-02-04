module Lookbook
  class Spec < ResourceNode
    def icon = "square-dashed-mouse-pointer"

    def url_path = lookbook_spec_path(self)

    # def id
    #   @id ||= Collection.many? ? hexid("#{collection.id}#{@entity.id}") : @entity.id
    # end
  end
end
