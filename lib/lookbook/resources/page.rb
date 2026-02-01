module Lookbook
  class Page < ResourceNode
    def icon = "file-text"

    def url_path = lookbook_page_path(collection, self)
  end
end
