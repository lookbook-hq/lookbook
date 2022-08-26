module Shared
  class ObjectInfo < Shared::Base
    renders_one :methods_list, Shared::OptionsList
    renders_one :description
    renders_one :example, ->(&block) do
      if block.present?
        code = capture(&block)
        "```#{@example_lang}\n#{code.strip_heredoc.strip}\n```"
      end
    end

    attr_reader :name, :title, :example_lang

    def initialize(name:, title: nil, example_lang: :erb, **attrs)
      @name = name
      @title = title || name.to_s
      @example_lang = example_lang
      @attrs = attrs
    end
  end
end
