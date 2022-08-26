module Shared
  class ConfigOptionInfo < Shared::Base
    renders_one :description
    renders_one :example, ->(&block) do
      if block.present?
        code = capture(&block)
        "```ruby\n#{code.strip_heredoc.strip}\n```"
      end
    end

    attr_reader :name, :title, :example_lang

    def initialize(name:, type: nil, default: nil, title: nil, **attrs)
      @name = name
      @title = title || name.to_s
      value = type.to_s == "String" ? "\"#{default}\"" : default
      @metadata = [{
        label: "Type",
        value: type
      }, {
        label: "Default",
        value: value.present? ? "<code>#{value}</code>".html_safe : nil
      }]
      @attrs = attrs
    end

    def metadata
      @metadata.filter { |item| item[:value].present? }
    end
  end
end
