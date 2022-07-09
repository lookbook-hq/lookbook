module Shared
  class ConfigOption < Shared::Base
    renders_one :description
    renders_one :example, ->(&block) do
      if block.present?
        "```ruby\n#{capture(&block).strip_heredoc}```"
      end
    end

    attr_reader :name, :title

    def initialize(name: , type: nil, default: nil, title: nil, **attrs)
      @name = name
      @title = title || name.to_s
      @metadata = [{
        label: "Type",
        value: type
      },{
        label: "Default",
        value: type.to_s == "String" ? "\"#{default}\"" : default
      }]
      @attrs = attrs
    end

    def metadata
      @metadata.filter { |item| item[:value].present? }
    end
  end
end