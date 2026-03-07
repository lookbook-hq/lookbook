module Lookbook
  class Spec < Resource
    def icon = "square-dashed-mouse-pointer"

    def url_path = spec_path(self)
    alias_method :href, :url_path
  end
end
