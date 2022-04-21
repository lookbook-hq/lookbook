module Lookbook
  class Embed::Component < Lookbook::Component
    def initialize(id, example: nil, params: {}, opts: {}, **html_attrs)
      @id = id
      @example = example
      @params = params
      @opts = opts
      super(**html_attrs)
    end

    protected

    def alpine_args
      [@id.to_json, "$store.pages.embeds"].join(",")
    end

    def alpine_component
      "embedComponent"
    end
  end
end
