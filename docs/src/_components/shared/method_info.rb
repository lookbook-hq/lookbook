require "cgi"

module Shared
  class MethodInfo < Shared::Base
    renders_one :options_list, ->(&block) do
      Shared::OptionsList.new class: "mt-0!", &block
    end
    renders_one :description, ->(&block) do
      CGI.unescapeHTML(capture(&block))
    end
    renders_one :example, ->(&block) do
      if block.present?
        code = capture(&block)
        "```#{example_lang}\n#{code.strip_heredoc.strip.gsub("&lt;", "<").gsub("&gt;", ">")}\n```"
      end
    end

    attr_reader :name, :title, :example_lang, :display_signature, :purpose

    def initialize(name:, title: nil, example_lang: :erb, signature: nil, purpose: nil, **attrs)
      @name = name
      @title = title || name.to_s
      @example_lang = example_lang
      @display_signature = signature != false
      @signature = signature || name.to_s
      @purpose = purpose
      @attrs = attrs
    end

    def signature
      "```ruby\n#{@signature}\n```"
    end
  end
end
