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

    def lookbook_display_params
      display_params = {}.with_indifferent_access
      if code_object&.tags(:display).present?
        code_object.tags(:display).each do |tag|
          parts = tag.text.strip.match(/^([^\s]*)\s?(.*)$/)
          if parts.present?
            begin
              display_params[parts[1]] = YAML.safe_load(parts[2] || "~")
            rescue SyntaxError => err
              Rails.logger.error("\n👀 [Lookbook] Invalid JSON in @display tag.\n👀 [Lookbook] (#{err})\n")
            end
          end
        end
      end
      display_params
    end

    # private

    def code_object
      @code_object ||= Lookbook::Engine.parser.get_code_object(taggable_object_path)
    end
  end
end
