module Shared
  class OptionsList < Shared::Base
    renders_many :options, "OptionListOption"

    class OptionListOption < Shared::Base

      def initialize(name:, default: nil, type: nil, **attrs)
        @name = name
        @default = default
        @type = type
        @attrs = attrs
      end
      
      def description
        desc = markdownify content
        unless @default.nil? && @type.nil?
          desc = "#{desc}<div class='options-list-meta'>#{[
            ("<span>Type: #{@type}</span>" if @type),
            ("<span>Default: #{@default}</span>" if @default),
          ].compact.join(",")}</div>"
        end
        desc.html_safe
      end
      
      def call
        tag.tr do
          safe_join([
            tag.td(class: "options-list-label") { @name },
            tag.td(class: "options-list-description") { description }
          ])
        end
      end
    end
  end
end