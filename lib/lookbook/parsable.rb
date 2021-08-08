module Lookbook
  module Parsable

    def hidden?
      !get_tag(:hidden)&.text&.strip == "false"
    end

    def label
      get_tag(:label)&.text
    end

    def notes
      code_object.docstring.to_s.strip
    end

    private

    def get_tag(tag_name, fallback = nil)
      tags = code_object.tags(tag_name)
      tags.any? ? tags.first : fallback
    end

    def get_tags(tag_name)
      code_object.tags(tag_name) || []
    end

    def code_object
      @code_object
    end

  end
end
