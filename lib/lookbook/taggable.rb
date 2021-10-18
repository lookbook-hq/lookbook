module Lookbook
  module Taggable
    def lookbook_hidden?
      if code_object&.tag(:hidden)
        code_object.tag(:hidden).text.strip != "false"
      end
    end

    def lookbook_label
      code_object&.tag(:label)&.text
    end

    def lookbook_notes
      if code_object&.docstring
        code_object.docstring.to_s.strip
      end
    end

    def lookbook_group
      code_object&.group
    end

    # private

    def code_object
      @code_object ||= Lookbook::Engine.parser.get_code_object(taggable_object_path)
    end
  end
end
