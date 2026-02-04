module Lookbook
  class Spec < ResourceNode
    def icon = "square-dashed-mouse-pointer"

    def url_path = lookbook_spec_path(self)
  end
end
