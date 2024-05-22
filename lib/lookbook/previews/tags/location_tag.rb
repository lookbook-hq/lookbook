module Lookbook
  class LocationTag < YardTag
    TAG_NAME = "location"
    TAG_ALIASES = ["logical_path"]

    def value
      Utils.strip_slashes(@text)
    end
  end
end
