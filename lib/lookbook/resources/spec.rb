module Lookbook
  class Spec < ResourceNode
    def icon = "square-dashed-mouse-pointer"

    def url_path = lookbook_spec_path(collection, self)
  end
end
